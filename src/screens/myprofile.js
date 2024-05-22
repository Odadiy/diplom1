import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const profileSnapshot = await firestore().collection('profile').limit(1).get();
      if (!profileSnapshot.empty) {
        const profileData = profileSnapshot.docs[0].data();
        setUsername(profileData.username);
        setEmail(profileData.email);
        setBio(profileData.bio);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const saveProfile = async () => {
    try {
      await firestore().collection('profile').doc('userInfo').set({
        username,
        email,
        bio,
      });
      console.log('Мэдээлэл шинэчлэгдлээ');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Нэр:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Нэрээ бичнэ үү"
        editable={editMode}
      />
      <Text style={styles.label}>Цахим шуудан:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Цахим шуудангаа бичнэ үү"
        keyboardType="email-address"
        editable={editMode}
      />
      <Text style={styles.label}>Утасны дугаар:</Text>
      <TextInput
        style={[styles.input, { height: 50 }]}
        value={bio}
        onChangeText={setBio}
        placeholder="Утасны дугаараа оруулна уу"
        keyboardType="phone-pad"
        multiline
        editable={editMode}
      />
      {editMode ? (
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Хадгалах</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Засварлах</Text>
        </TouchableOpacity>
      )}
    </View>
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
  editButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;
