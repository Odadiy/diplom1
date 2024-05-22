import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const NewsPostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [cont, setCont] = useState('');

  const handleChooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      await firestore().collection('news').add({
        title: title,
        content: content,
        image: image,
        cont: cont,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      });
      Alert.alert(
        'Success',
        'Амжилттай нийтлэгдлээ.',
        [{ text: 'Ok' }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Нийтлэхэд алдаа гарлаа.');
    }

    setTitle('');
    setContent('');
    setImage(null);
    setCont('');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Гарчиг:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Гарчиг бичих"
        />
        <Text style={styles.label}>Агуулга:</Text>
        <TextInput
          style={[styles.input, { height: 200 }]}
          value={content}
          onChangeText={setContent}
          placeholder="Агуулга бичих"
          multiline
        />
        <TouchableOpacity style={styles.imageButton} onPress={handleChooseImage}>
          <Text style={styles.imageButtonText}>Зураг сонгох</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Text style={styles.label}>Дэлгэрэнгүй агуулга:</Text>
        <TextInput
          style={[styles.input, { height: 200 }]}
          value={cont}
          onChangeText={setCont}
          placeholder="Дэлгэрэнгүй агуулга бичих"
          multiline
        />
        <Text style={styles.dateText}>Он сар өдөр: {new Date().toDateString()}</Text>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Нийтлэх</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: 'violet',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: 'violet',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default NewsPostScreen;
