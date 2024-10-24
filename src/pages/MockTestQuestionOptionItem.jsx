import { Button, Grid } from '@mui/material';
import React from 'react'

const MockTestQuestionOptionItem = (props) => {
    const { currentQuestion, optionKey, optionValue, selectedAnswers } = props;
    const handleOptionSelect = (key, value) => {
        if (!key || !value) return
        if (props.handleOptionSelect) props.handleOptionSelect({key, value});
    }
    const currentAnswer = selectedAnswers.find((x) => x.questionId === currentQuestion.questionId);
    return (
        <>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        color:
                          currentAnswer?.selectedAnswer?.answerVal === optionValue
                            ? "white"
                            : "black",
                        borderColor: "#1A73E8",
                        borderRadius: 2,
                        backgroundColor:
                          currentAnswer?.selectedAnswer?.answerVal === optionValue
                            ? "#1A73E8"
                            : "transparent",
                        "&:hover": {
                          backgroundColor: "#1A73E8",
                          color: "white",
                        },
                        ":active": {
                          backgroundColor: "#1A73E8",
                          color: "white",
                        },
                      }}
                    onClick={() => {
                        handleOptionSelect(
                            optionKey,
                            optionValue
                        )
                    }
                    }
                >
                    {optionValue.includes("#") ? (
                        <img
                            src={require(`../assets/imgs/${optionValue.replace(
                                "#",
                                ""
                            )}.png`)}
                            alt={optionValue}
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "contain",
                            }}
                        />
                    ) : (
                        optionValue
                    )}
                </Button>
            </Grid>
        </>
    )
}

export default MockTestQuestionOptionItem