import React, { useState } from "react";
import { useChatContext, ChannelDelete } from "stream-chat-react";
import { message } from "antd";
import { UserList } from "./";
import { CloseCreateChannel } from "../assets";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ChannelNameInput = ({
  channelName = "",
  setChannelName,
  toggleModal,
}) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="Channel Name"
        required
      />

      <p
        style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
        onClick={() => toggleModal()}
      >
        Change Theme
      </p>

      <p>Add Members</p>
    </div>
  );
};

const EditChannel = ({ setIsEditing, setTheme }) => {
  const { channel, client } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [isModal, setModal] = useState(false);

  const updateChannel = async (e) => {
    e.preventDefault();

    try {
      const nameChanged =
        channelName !== (channel.data.name || channel.data.id);

      if (nameChanged) {
        await channel.update(
          { name: channelName },
          { text: `Channel name changed to ${channelName}` }
        );
      }

      if (selectedUsers.length) {
        await channel.addMembers(selectedUsers);
      }

      setChannelName(null);
      setIsEditing(false);
      setSelectedUsers([]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      message.error("Only admin can add members.");
    }
  };

  const toggleModal = () => {
    setModal(!isModal);
  };

  const changeTheme = (color) => {
    setTheme(color);
    message.success("Theme Changed!")
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%", // Adjust the width as needed
    height: "50%",
    background: "white",
    border: "1px solid #ccc", // Add border
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  };
  return (
    <>
      <div className="edit-channel__container">
        <div className="edit-channel__header">
          <p>Edit Channel</p>
          <CloseCreateChannel setIsEditing={setIsEditing} />
        </div>
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
          toggleModal={toggleModal}
        />
        <UserList setSelectedUsers={setSelectedUsers} />
        <div className="edit-channel__button-wrapper" onClick={updateChannel}>
          <p>Save Changes</p>
        </div>
      </div>

      <Modal isOpen={isModal} toggle={toggleModal} size="xl" style={modalStyle}>
        <ModalHeader toggle={toggleModal} style={{ borderBottom: '0.5px solid gray', marginBottom: "10px" }}>
          <h2 style={{marginLeft: "20px"}}> Change Chat Theme</h2>
        </ModalHeader>
        <ModalBody >
          <div style={{marginLeft: "40px"}}>
            <span
              onClick={() => changeTheme("#ffffff")}
              style={{
                backgroundColor: "#ffffff",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
                border: "1px solid gray"
              }}
            ></span>
            <span
              onClick={() => changeTheme("#ffcccc")}
              style={{
                backgroundColor: "#ffcccc",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
            <span
              onClick={() => changeTheme("#ccffcc")}
              style={{
                backgroundColor: "#ccffcc",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
            <span
              onClick={() => changeTheme("#a5a0eb")}
              style={{
                backgroundColor: "#a5a0eb",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
             <span
              onClick={() => changeTheme("#eba0c3")}
              style={{
                backgroundColor: "#eba0c3",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
             <span
              onClick={() => changeTheme("#a9ecd6")}
              style={{
                backgroundColor: "#a9ecd6",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
            
            <span
              onClick={() => changeTheme("#ece0a9")}
              style={{
                backgroundColor: "#ece0a9",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
            <span
              onClick={() => changeTheme("#4e4eb4")}
              style={{
                backgroundColor: "#4e4eb4",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
            <span
              onClick={() => changeTheme("#232324")}
              style={{
                backgroundColor: "#232324",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
            <span
              onClick={() => changeTheme("gray")}
              style={{
                backgroundColor: "gray",
                cursor: "pointer",
                marginRight: "10px",
                padding: "10px",
                fontSize: "60px",
                width: "130px",
                height: "130px",
                display: "inline-block",
              }}
            ></span>
            
           
           
            
          </div>
        </ModalBody>
        <ModalFooter>{/* Your modal footer content */}</ModalFooter>
      </Modal>
    </>
  );
};

export default EditChannel;
