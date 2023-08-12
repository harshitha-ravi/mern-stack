import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexLayout from "components/FlexLayout";
import Dropzone from "react-dropzone";
import StudentImage from "components/StudentImage";
import WidgetContainer from "components/WidgetContainer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyQuestionWidget = ({ profileImage }) => {
  // To dispacth the actions from the reducer
  const dispatch = useDispatch();

  // To check if the image section of the post was clicked
  const [isImage, setIsImage] = useState(false);

  // to set the actual image being uploaded as part of the post
  const [image, setImage] = useState(null);

  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.student);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // Function to handle the posts created. This function will call the Backend API
  const makeCallToCreatePost = async () => {
    // declare the formdata
    const formData = new FormData();
    formData.append("studentId", _id);
    formData.append("question", post);

    // If the post contains an image -> then add it to the formData
    if (image) {
      formData.append("image", image);
      formData.append("profileImage", image.name);
    }

    // Backend call to create a question post
    const response = await fetch(`http://localhost:3001/posts/create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    // Getting the backend response
    const questionPosts = await response.json();

    // dispatch the updated post - setPosts
    dispatch(setPosts({ questionPosts }));

    // once done - resetting the image and post
    setImage(null);
    setPost("");
  };

  return (
    <WidgetContainer>
      <FlexLayout gap="1.5rem">
        <StudentImage image={profileImage} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexLayout>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexLayout>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexLayout>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexLayout>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexLayout>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexLayout>
        <FlexLayout gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexLayout>

        {isNonMobileScreens ? (
          <>
            <FlexLayout gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexLayout>

            <FlexLayout gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexLayout>

            <FlexLayout gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexLayout>
          </>
        ) : (
          <FlexLayout gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexLayout>
        )}

        <Button
          disabled={!post}
          onClick={makeCallToCreatePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Ask Question
        </Button>
      </FlexLayout>
    </WidgetContainer>
  );
};

export default MyQuestionWidget;
