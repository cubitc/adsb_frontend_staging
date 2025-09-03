const RequiredLabel = ({ title }: { title: string }) => {
  return (
    <>
      {title}
      <span className="text-red-500">*</span>
    </>
  );
};
export default RequiredLabel;
