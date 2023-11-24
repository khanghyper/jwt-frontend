import { memo } from "react";
// eslint-disable-next-line react/prop-types, react-refresh/only-export-components
const FormInput = ({ title, example, type, onHandleData, isValid, value }) => {
  isValid = isValid !== undefined ? isValid : true;

  return (
    <>
      <div className="mb-3">
        <label className="form-label">{title}</label>
        <input
          type={type}
          placeholder={example}
          className={isValid ? "form-control" : "form-control is-invalid"}
          onChange={onHandleData}
          value={value}
        />
      </div>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default memo(FormInput);
