import { Box, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MyButton from "../../../../Components/MyCompoenents/MyButton";
import FlexBetween from "../../../../Components/FlexBetween";
import { sendQuestion } from "../../API/chatbot.api";
import { useTheme } from "@emotion/react";
import { CloseSharp } from "@mui/icons-material";
import FlexEvenly from "../../../../Components/FlexEvenly";

const WriteMsg = ({
  collectionName,
  setMessages,
  msgList,
  setLoading,
  loading,
  sampleQ,
}) => {
  const [val, setVal] = useState("");
  const token = useSelector((state) => state.token);

  console.log(collectionName);
  const handleSendMess = async (question) => {
    setLoading(true);
    try {
      const startTime = performance.now();
      msgList.push({ question: question });
      setMessages([...msgList]);
      // console.log('he')
      const { data, message } = await sendQuestion({
        question,
        token,
        collectionName: collectionName ? collectionName : null,
      });
      // console.log(data, message)
      msgList.push({ answer: String(data || message) });

      const endTime = performance.now();
      const elapsedTime = (endTime - startTime) / 1000;
      msgList.push({ answer: `Taken: ${elapsedTime.toFixed(2)} seconds` });
      setMessages(msgList);
    } catch (error) {
      console.error("Error sending question:", error);
      alert("Failed to send question.");
    } finally {
      setLoading(false);
    }
    setVal("");
  };
  const { palette } = useTheme();
  const [displaySampleQ, setDisplaySampleQ] = useState(true);

  const handleSendMessOnSubmit = (e) => {
    e.preventDefault();
    handleSendMess(val);
  };
  return (
    <form style={{ width: "100%" }} onSubmit={handleSendMessOnSubmit}>
      {displaySampleQ && sampleQ && (
        <FlexBetween>
          <FlexEvenly sx={{ width: "30%" }}>
            <IconButton
              disabled={loading}
              onClick={() => setDisplaySampleQ(false)}
            >
              <CloseSharp width={"2rem"} />
            </IconButton>
          </FlexEvenly>
          <FlexBetween
            width={"100%"}
            maxHeight={"10rem"}
            overflow={"auto"}
            flexDirection={"column"}
            gap={1}
            padding={"0.5rem"}
          >
            {sampleQ.map((q, index) => (
              <FlexBetween key={index} width={"100%"}>
                <Box />
                <Box
                  fontWeight={"700"}
                  padding={"0.3rem"}
                  borderRadius={"0.3rem"}
                  onClick={() => handleSendMess(q)} // Call handleSendMess with question
                  sx={{
                    color: palette.primary.main,
                    background: palette.neutral.light,
                    cursor: "pointer",
                  }}
                >
                  {q}
                </Box>
              </FlexBetween>
            ))}
          </FlexBetween>
        </FlexBetween>
      )}
      <FlexBetween width={"100%"}>
        <TextField
          fullWidth
          disabled={loading}
          type="text"
          placeholder="Type here..."
          onChange={(e) => setVal(e.target.value)}
          value={val}
        />
        <MyButton disabled={loading} fullwidth={false} label="Send" />
      </FlexBetween>
    </form>
  );
};

export default WriteMsg;
