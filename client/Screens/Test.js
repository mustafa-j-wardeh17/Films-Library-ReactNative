import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFilmRepository } from '../Api/db'

const Test = () => {
    const [Repository, SetRepository] = useState([])

    useEffect(() => {
        getFilmRepository().then((data) => {
            SetRepository(data)
            console.log(data[0])
        })
    }, [])
    return (
        <View className='flex-1 bg-red-500 justify-center items-center'>
            <Text>{Repository[1].name}</Text>
        </View>
    )
}

export default Test