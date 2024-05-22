import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const DoctorProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const profilesSnapshot = await firestore().collection('doctorProfiles').get();
      const profilesData = profilesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProfiles(profilesData);
    } catch (error) {
      console.error('Error fetching doctor profiles:', error);
    }
  };

  const deleteProfile = async (id) => {
    try {
      await firestore().collection('doctorProfiles').doc(id).delete();
      fetchProfiles();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const renderProfileItem = ({ item }) => {
    return (
      <View style={styles.profileItem}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{item.name}</Text>
        <Text style={styles.label}>Education:</Text>
        <Text style={styles.value}>{item.education}</Text>
        <Text style={styles.label}>Hospital:</Text>
        <Text style={styles.value}>{item.hospital}</Text>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{item.address}</Text>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{item.phoneNumber}</Text>
        <Text style={styles.label}>Hospital Phone:</Text>
        <Text style={styles.value}>{item.phone}</Text>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => deleteProfile(item.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleUpdate(item)}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleUpdate = (item) => {
    console.log('Updating profile:', item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        renderItem={renderProfileItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'deeppink',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DoctorProfiles;
