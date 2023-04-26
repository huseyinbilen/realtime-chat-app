const Person = ({ id, username, onClick }) => {
  return (
    <li key={id} onClick={onClick}>
      <div>
        <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-bold text-gray-600">
                {username}
              </span>
              <div className="flex space-x-2">
                <button className="flex items-center justify-center w-8 h-8 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
                  <span className="sr-only">Add Friends</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="flex items-center justify-center w-8 h-8 rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none">
                  <span className="sr-only">Remove Friends</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M13.414 6.586a2 2 0 10-2.828-2.828L10 7.172 8.414 5.586a2 2 0 10-2.828 2.828L7.172 10l-1.586 1.586a2 2 0 102.828 2.828L10 12.828l1.586 1.586a2 2 0 102.828-2.828L12.828 10l1.586-1.586z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>
    </li>
  );
};

export default Person;
