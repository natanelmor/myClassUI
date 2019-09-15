import React from 'react';
import { View, Text, FlatList } from 'react-native';

const QuestionsToAdd = (props) => {
    return (
        <FlatList
            data={props.questions}
            renderItem={({ question }) => {
                    <Text>{question.question}</Text>
            }}
            keyExtractor={(question) => question.question}
        />
    )
}

export default QuestionsToAdd;