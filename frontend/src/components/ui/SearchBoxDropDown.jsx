import { memo } from "react";
import ArrowLeft from "../../icons/Arrow";
import SearchedUsers from "../SearchedUsers";

const SearchBoxDropDown = memo(
  ({ setIsSearchBoxOpen, searchUserInput, handleInputChange }) => {
    return (
      <div className="dark absolute inset-0 z-50 bg-primary-black-100 sm:absolute sm:inset-auto sm:top-[4rem] sm:w-full sm:h-[500px] w-screen h-screen rounded-lg sm:animate-animate-appear origin-top overflow-auto">
        <div className="sm:hidden flex justify-between gap-3 px-5 mt-5 w-full">
          <div
            onClick={()=> setIsSearchBoxOpen(false)}
            className="p-2 bg-primary-dark-900 rounded-md"
          >
            <ArrowLeft />
          </div>
          <div className="flex-grow">
            <input
              type="text"
              value={searchUserInput}
              onInput={handleInputChange}
              placeholder="Search Users"
              className="relative dark:bg-primary-dark-900 outline outline-primary-dark-800 rounded-3xl w-full max-w-[40rem] p-2 pl-4 sm:p-2 sm:pl-5 ring-blue-600 focus:ring-2"
            />
          </div>
        </div>
        <div>
          <SearchedUsers filter={searchUserInput} />
        </div>
      </div>
    );
  }
);

export default SearchBoxDropDown;
