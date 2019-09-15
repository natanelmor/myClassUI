import React from 'react';
import { View, Text, FlatList } from 'react-native';

const QuestionsToAdd = (props) => {
    console.log('Questions to add: '+ JSON.stringify(props.questions))
    return (
        <FlatList
            data={props.questions}
            renderItem={({ question }) => {
                    console.log(question),
                    <Text>{question.question}</Text>
            }}
            keyExtractor={(question) => question.question}
        />
    )
}

export default QuestionsToAdd;