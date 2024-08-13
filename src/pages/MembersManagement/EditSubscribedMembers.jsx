import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../api";
import Header from "../../components/dashboard/Header";
import InputField from "../../components/general/InputField";
import ButtonComponent from "../../components/general/ButtonComponent";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../hooks/useToast";
import { editSubscribedMemberSchema } from "../../validations/addmember";
import { CodeType } from "../../data/codeData";
import { calculateEndDate, formatDate } from "../../utils/date";
import { useQuery } from "../../hooks/queryParam";
import Loader from "../../components/general/Loader";

const EditSubscribedMembers = () => {
  const navigate = useNavigate();

  const [allMembers, setAllMembers] = useState(null);
  const [allSubscriptions, setAllSubscriptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(true);
  const [value, setValue] = useState(null);
  let query = useQuery();
  let id = Number(query.get("id"));
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(editSubscribedMemberSchema) });

  const [singleUser, setSingleUser] = useState(null);
  const getData = async () => {
    try {
      const response = await API.getAllUsers();
      setAllMembers(response?.data?.data);
      const response2 = await API.getAllSubscription();
      setAllSubscriptions(response2?.data?.data);
      const response3 = await API.getSingleSubscribedMembers(id);
      setSingleUser(response3?.data?.data);
      setValue(response3?.data?.data?.endDate);
      setPageData(false);
    } catch (error) {
      errorToast(error, "Can not fetch members");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (!data?.discountType) {
        delete data?.discount;
        delete data?.discountType;
      } else {
        data.discount = Number(data?.discount);
      }

      const response = await API.updateUserSubscription(singleUser?.id, {
        ...data,
        userId: singleUser?.userId,
        startDate: formatDate(data?.startDate),
        endDate: formatDate(value),
      });
      successToast(response?.data?.message);
      setLoading(false);
      navigate(-1);
    } catch (error) {
      setLoading(false);
      errorToast(error, "Cannot add user");
    }
  };
  const handleCancle = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (watch("subscriptionId")) {
      const id = getValues("subscriptionId");
      const selected = allSubscriptions.find((item) => item?.id == id);
      setValue(calculateEndDate(selected));
    }
  }, [watch("subscriptionId")]);

  return (
    <div className="page-area mt-10">
      <Header
        pagetitle={"Members"}
        previous={"Dashboard"}
        currentpage={"Add Members"}
      />

      {singleUser ? (
        <form
          className="grid grid-col-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="page-comp bg-white mt-10 rounded-xl px-8 py-8">
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4  ">
              <InputField
                emailTrue={true}
                label="Member"
                type="select"
                options={allMembers}
                placeholder="Member Email"
                defaultValue={singleUser?.userId}
                errors={errors}
                name="userId"
                disabled={true}
                register={register}
              />
              <InputField
                label="Subscriptions"
                type="select"
                options={allSubscriptions}
                placeholder="Subscriptions"
                errors={errors}
                defaultValue={singleUser?.subscriptionId}
                name="subscriptionId"
                register={register}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Discount Type"
                placeholder="Discount Type"
                type="select"
                options={CodeType}
                errors={errors}
                defaultValue={singleUser?.discountType}
                name="discountType"
                register={register}
              />

              <InputField
                label={
                  watch("type") === "percentage"
                    ? "Value in Percentage"
                    : "Value in Amount"
                }
                type="number"
                placeholder="enter amount i.e 10,20,40 etc"
                errors={errors}
                name="discount"
                defaultValue={singleUser?.discount}
                register={register}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label="Status"
                type="select"
                options={[true, false]}
                placeholder="Status"
                errors={errors}
                defaultValue={singleUser?.isActive}
                name="isActive"
                register={register}
              />
              <InputField
                label="Send Email to member?"
                type="select"
                options={[true, false]}
                placeholder="Send Email"
                errors={errors}
                defaultValue={singleUser?.sendEmail}
                name="sendEmail"
                register={register}
              />
            </div>
            <div className="grid grid-col-1 sm:grid-cols-2 gap-4 mt-4">
              <InputField
                label={"Start Date"}
                type="date"
                placeholder="Subscription Start Date"
                errors={errors}
                name="startDate"
                defaultValue={formatDate(new Date(singleUser?.startDate))}
                register={register}
              />

              <InputField
                label={"End Date"}
                type="date"
                placeholder="Subscription End Date"
                errors={errors}
                name="endDate"
                value={formatDate(value)}
                setValue={setValue}
                register={register}
              />
            </div>

            <div className="w-full md:w-1/4 mt-4">
              <div className="flex gap-3">
                <ButtonComponent
                  type="submit"
                  text="Save"
                  loading={loading}
                  isActive={true}
                />
                <ButtonComponent
                  text="Cancel"
                  isActive={true}
                  btnclass={"bg-red-500"}
                  onClick={() => handleCancle()}
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default EditSubscribedMembers;
