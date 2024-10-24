import React from 'react'
import MockTestQuestionOptionItem from './MockTestQuestionOptionItem'
import { Box, Grid } from '@mui/material';

const MockTestQuestionItem = (props) => {
    const {currentQuestion, currentQuestionIndex, selectedAnswers} = props;

    const handleOptionSelect = (args) => {
        if (!args) return;

        const answer = {
            questionId: currentQuestion.questionId,
            answerKey: args.key,
            answerVal: args.value
        }
        if (props.onAnswerSelect) props.onAnswerSelect(answer)
    }

    const imgMatch = currentQuestion.qText.match(/\(#(\d+)img\)/);
    const imgSrc = imgMatch
      ? require(`../assets/imgs/${imgMatch[1]}img.png`)
      : null;
    const splitedData =
      currentQuestion.qText.split(/\s*\(#\d+img\)\s*/);

  return (
    <>
      {currentQuestionIndex + 1}.{splitedData[0]}
      {imgSrc && (
        <Box
          sx={{
            margin: "10px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={imgSrc}
            alt={`${imgMatch[1]}img`}
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              height: "auto",
            }}
          />
        </Box>
      )}
      {splitedData[1]}
      
      <Grid container spacing={2}>
        {Object.entries(currentQuestion.options).map(([key, value]) => {
          return(
            <React.Fragment key={value}>
                <MockTestQuestionOptionItem currentQuestion={currentQuestion} optionKey={key} optionValue={value} handleOptionSelect={handleOptionSelect}selectedAnswers={selectedAnswers} />
            </React.Fragment>
        )})}
      </Grid>
    </>
  )
}

export default MockTestQuestionItem