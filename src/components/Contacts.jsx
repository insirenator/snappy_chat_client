/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// 

const Contacts = ({ contacts, onClickHandler, selectedContact, activeUsers }) => {
  return (
    <div className="flex sm:flex-col flex-row gap-2 p-1 overflow-auto contacts-list">
      {contacts.map((contact, idx) => (
        <div
          tabIndex={0}
          key={contact._id}
          className={
            `transition-all cursor-pointer flex sm:flex-row flex-col min-w-fit items-center gap-4 p-2 rounded-lg ${selectedContact === idx ? "bg-purple-500" : "bg-slate-600 hover:bg-slate-700"}`}
          onClick={() => onClickHandler(idx)}
          onKeyDown={(event) => event.key === "Enter" && onClickHandler(idx)}
        >
          <img
            src={
              contact.avatarImage
                ? `data:image/svg+xml;base64,${contact.avatarImage}`
                : "/no-profile-picture.png"
            }
            alt="avatar"
            className={"w-10 " + (activeUsers.includes(contact._id) ? "border-2 p-[2px] border-green-400 rounded-full" : "")}
          />
          <h3>{contact.username}</h3>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
