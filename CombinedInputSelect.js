import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Input } from "@windmill/react-ui";
import DownIcon from "./caret-down.svg";

function CombinedInputSelect(props) {
  const { disabled, ID, className, style, defaultValue, dropDown = [] } = props;

  // const dropDown = ["select1", "select2", "select3", "select4"];
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleInputChage = (e) => setValue(e.target.value);
  const handleSelect = (val) => {
    setValue(val);
    setOpen(false);
  };

  const getFilteredList = (arr = []) => {
    return arr.filter((f) => {
      return f.toLowerCase().includes(value.toLocaleLowerCase());
    });
  };

  /**
   * for outside click
   */
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open != null && ref.current && !ref.current.contains(e.target)) {
        setOpen(null);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref} style={style}>
      <Input
        disabled={disabled}
        id={ID}
        className={className}
        onChange={handleInputChage}
        value={value}
        onClick={() => setOpen(true)}
        style={{
          MozAppearance: "none",
          WebkitAppearance: "none",
        }}
        autocomplete="off"
      />
      <img
        src={DownIcon}
        className="w-4 h-4 absolute top-2.5 right-3 opacity-50"
        alt=""
      />
      {open && getFilteredList(dropDown).length > 0 && (
        <div className="absolute top-10 right-0 left-0 p-3 bg-white border border-solid border-slate-500 text-sm rounded shadow-md">
          {getFilteredList(dropDown).map((m, i) => {
            return (
              <p
                key={i}
                className="cursor-pointer hover:bg-violet-600 pb-1"
                onClick={() => handleSelect(m)}
              >
                {m}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

CombinedInputSelect.propTypes = {
  defaultValue: PropTypes.string,
  ID: PropTypes.string,
  disabled: PropTypes.bool,
};

export default CombinedInputSelect;
