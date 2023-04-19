function Person(props) {
    return (
        <div>
              <a className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-bold text-gray-600">
                      {props.username}
                    </span>
                  </div>
                </div>
              </a>
        </div>
    );
}

export default Person;