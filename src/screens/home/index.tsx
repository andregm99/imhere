import {  Text, View,TextInput, TouchableOpacity, ScrollView, FlatList,Alert } from 'react-native';
import {styles} from './styles'
import { Participant } from '../../Components/Participant';
import { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import *  as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

type data ={
  name:string
}

const schema = yup.object({
  name:yup.string().trim().required('Favor informar nome do participante').min(3,'Nome deve conter no mínimo 3 letras.')
})


export function Home() {

  const {control,handleSubmit,formState:{errors},resetField} = useForm<data>({
    resolver:yupResolver(schema)
  })

  const [participants,setParticipants]=useState<string[]>([])

  const today = new Date().toLocaleDateString('pt-BR', {//data atual.
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});


  function handleParticipantAdd({name}:data) {

    const nameExist = participants.some(p=>p.toLowerCase() === name.toLowerCase())

    if (nameExist) {
      return Alert.alert("Participante já existe",'Participante já está presente na lista')
    }

    setParticipants(prevState=>[...prevState,name])


   resetField('name')//resetando input.
   
  }

  function handleParticipantRemove (name:string){//Removendo participantes

    Alert.alert("Remover",`Remover o participante ${name}?`,[
      {
        text:'Sim',
        onPress: () =>   setParticipants(prevState=> prevState.filter(participant => participant !== name))
        
      },
      {
        text: 'Não',
        style:'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.EventName}>
        Lista de participantes
      </Text>  

      <Text style={styles.EventDate} >
        {today}
      </Text>
      
    <View style={styles.form}>

      <Controller
          control={control}
          name='name'
          render={({field:{onChange,value}})=>(
          <TextInput 
            style={styles.input}
            placeholder='Nome do participante'
            placeholderTextColor='#6b6b6b'
            onChangeText={onChange}
            value={value}
          
        />
        )}
      />    
          <TouchableOpacity style={styles.button} onPress={handleSubmit(handleParticipantAdd)}>
            <Text style={styles.buttonText}>
              +
            </Text>
          </TouchableOpacity>
    </View>

    <View style={{alignSelf:'center', marginBottom:12}}>
      {errors.name&&(
        <Text style={{color:'red', fontSize:18}}>
          {errors.name.message}
        </Text>
      )}
    </View>


      <FlatList
        data={participants}
        keyExtractor={item=> item}
        renderItem={({item})=>(
          <Participant 
            key={item}
            name ={item}
            onRemove={()=>handleParticipantRemove(item)}
          />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={()=>(
        <Text style={styles.listEmptyText}>
          Ninguém chegou no evento ainda? Adicione um participante a sua lista de presença.
        </Text>
      )}
      />

    </View>
  );
}

