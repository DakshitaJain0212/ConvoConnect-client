import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from "./";
import { CloseCreateChannel } from "../assets";
import { message } from "antd";
import icon from "../assets/icon.jpeg";
const ChannelNameInput = ({
  channelName = "",
  setChannelName,
  imgUrl,
  setImageUrl,
}) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  };

  const handleImage = (event) => {
    console.log("hello");
    event.preventDefault();

    const selectedFile = event.target.files[0];
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "convoConnect");
    data.append("cloud_name", "dk2hwqtnv");
    fetch(`https://api.cloudinary.com/v1_1/dk2hwqtnv/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
        const file_loc = data.secure_url;
        setImageUrl(file_loc);
        console.log(imgUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="channel-name-input__wrapper">
      <div className="channel-name-input__wrapper-name">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="Channel Name"
        required
      />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "flex-start",
          gap: "0.75rem",
        }}
      >
        <span className="auth__form-container_fields-content_file_image">
          <div className="auth__form-container_fields-content_file_figure">
            <img
              src={imgUrl}
              alt="image"
              style={{
                width: "100%",
                borderRadius: "50%",
              }}
            />
          </div>
        </span>
        <div className="auth__form-container_fields-content_file">
          <label htmlFor="avatarURL">Upload Photo</label>
          <input
            name="avatarURL"
            type="file"
            id="imageInput"
            placeholder="Upload an image file"
            onChange={handleImage}
            accept="image/*"
            // style={{ display: ''}}
          ></input>
        </div>
      </div>
      <p>Add Members</p>
    </div>
  );
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");
  const [ imgUrl,setImageUrl ] = useState(icon);

  const CreateUserChannels = async (e) => {
    e.preventDefault();

    // if(!channelName){
    //   message.error("channel name is empty");
    // return;
    // }

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
        imageUrl: imgUrl,
      });

      console.log(client);

      await newChannel.watch();
      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
          imgUrl={imgUrl}
          setImageUrl={setImageUrl}
        />
      )}
      <UserList 
      setSelectedUsers={setSelectedUsers}
      selectedUsers={selectedUsers}
      setIsCreating={setIsCreating}
      createType={createType}
      setActiveChannel={setActiveChannel}
      channelName={channelName}
      setChannelName={setChannelName}
      client={client}
      />
      
      <div
        className="create-channel__button-wrapper"
        onClick={CreateUserChannels}
      >
        <p>{createType === 'team' ? 'Create Channel' : 'Send Direct Message'}</p>
      </div>
      
    </div>
  );
};

export default CreateChannel;
