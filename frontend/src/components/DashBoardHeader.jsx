import { memo, useCallback, useState } from "react";
import SettingsIcon from "../icons/Setttings";
import Bell from "../icons/Bell";
import SearchIcon from "../icons/SearchIcon";
import SearchBoxDropDown from "./ui/SearchBoxDropDown";

const DashBoardHeader = () => {
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchUserInput, setSearchUserInput] = useState("");

  const toggleSearchBox = useCallback(() => {
    console.log("toggled search box")
    setIsSearchBoxOpen((prev) => !prev);
  }, []);

  const handleInputChange = useCallback((e) => {
    setSearchUserInput(e.target.value);
  }, []);

  return (
    <div className="relative dark:text-primary-white-text dark:bg-primary-black-100 flex items-center justify-between gap-2 min-h-16 md:gap-6 p-3 px-6 lg:px-10 m-auto">
      <h1 className="font-Inter tracking-wider font-bold text-xl text-primary-brand-color">
        PayEase
      </h1>
      <div className="sm:flex items-center justify-center sm:relative w-[60%] max-w-[40rem] rounded-3xl p-0.5">
        <input
          type="text"
          value={searchUserInput}
          
          onFocus={()=> setIsSearchBoxOpen(true)}
          onChange={(e) => {
            handleInputChange(e);
          }}
          placeholder="Search Users"
          className="opacity-0 sm:opacity-100 relative dark:bg-primary-dark-900 outline outline-primary-dark-800 rounded-3xl w-full max-w-[40rem] p-2 pl-4 sm:p-2 sm:pl-5 ring-blue-600 focus:ring-2"
        />
        <div
          onClick={toggleSearchBox}
          className="opacity-0 sm:opacity-100 absolute h-[90%] w-[10%] min-w-12 right-1 bg-primary-dark-800 grid place-items-center cursor-pointer rounded-tr-3xl rounded-br-3xl"
        >
          <SearchIcon />
        </div>
        {isSearchBoxOpen && (
          <SearchBoxDropDown 
          setIsSearchBoxOpen={setIsSearchBoxOpen}
            searchUserInput={searchUserInput}
            handleInputChange={handleInputChange}
          />
        )}
      </div>
      <div className="flex items-center gap-3.5">
        <div
          onClick={toggleSearchBox}
          className="sm:hidden grid place-items-center relative cursor-pointer select-none p-1 sm:p-3 bg-primary-dark-900 rounded-md aspect-square h-10 sm:h-12"
        >
          <SearchIcon />
        </div>
        <div className="grid place-items-center relative cursor-pointer select-none p-1 :md:p3 bg-primary-dark-900 rounded-md aspect-square h-10 md:h-12">
          <Bell />
        </div>
        <div className="grid place-items-center relative cursor-pointer select-none p-1 md:p-3 bg-primary-dark-900 rounded-md aspect-square h-10 md:h-12">
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;