import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MessengerApp = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const defaultProfiles = {
    sender: {
      id: '1',
      name: 'Me',
      avatar: require('./assets/mark.jpg')
    },
    receiver: {
      id: '2',
      name: 'John',
      avatar: require('./assets/bago.jpg')
    }
  };

  const [profiles, setProfiles] = useState(defaultProfiles);

  // Sample responses from the receiver
  const receiverResponses = [
    "Hey, that's interesting!",
    "Tell me more about it!",
    "That's cool! 😊",
    "I understand what you mean",
    "Thanks for sharing!",
    "How's your day going?",
    "That sounds great!",
    "Really? That's awesome!",
    "I agree with you",
    "Let's meet up soon!"
  ];

  // Sample responses are defined above

  const pickImage = async (type) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'message') {
        setSelectedImage(result.assets[0].uri);
      } else {
        setProfiles(prev => ({
          ...prev,
          [type]: {
            ...prev[type],
            avatar: result.assets[0].uri
          }
        }));
      }
    }
  };

  const generateReceiverResponse = () => {
    setIsTyping(true);
    const randomDelay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1-3 seconds
    const randomResponse = receiverResponses[Math.floor(Math.random() * receiverResponses.length)];

    setTimeout(() => {
      const receiverMessage = {
        id: Date.now().toString(),
        text: randomResponse,
        image: null,
        timestamp: new Date().toLocaleTimeString(),
        sender: profiles.receiver.id,
        isSender: false,
      };
      setMessages(prevMessages => [...prevMessages, receiverMessage]);
      setIsTyping(false);
    }, randomDelay);
  };

  const sendMessage = () => {
    if (currentMessage.trim() || selectedImage) {
      const newMessage = {
        id: Date.now().toString(),
        text: currentMessage.trim(),
        image: selectedImage,
        timestamp: new Date().toLocaleTimeString(),
        sender: profiles.sender.id,
        isSender: true, // This message is from the current user
      };

      setMessages([...messages, newMessage]);
      setCurrentMessage('');
      setSelectedImage(null);

      // Generate receiver's response
      generateReceiverResponse();
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isSender ? styles.senderContainer : styles.receiverContainer
    ]}>
      <View style={styles.avatarContainer}>
        <Image 
          source={item.isSender ? profiles.sender.avatar : profiles.receiver.avatar} 
          style={styles.avatar}
        />
      </View>
      <View style={[
        styles.messageContent,
        item.isSender ? styles.senderContent : styles.receiverContent
      ]}>
        {item.text && <Text style={[
          styles.messageText,
          item.isSender ? styles.senderText : styles.receiverText
        ]}>{item.text}</Text>}
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.messageImage} />
        )}
        <Text style={[
          styles.timestamp,
          item.isSender ? styles.senderTimestamp : styles.receiverTimestamp
        ]}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={profiles.receiver.avatar}
          style={styles.avatar}
        />
        <View style={styles.onlineStatus} />
        <Text style={styles.headerText}>John</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
      />
      {isTyping && (
        <View style={styles.typingContainer}>
          <Image 
                        source={profiles.receiver.avatar} 
            style={styles.typingAvatar}
          />
          <Text style={styles.typingText}>John is typing...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={() => pickImage('message')}>
          <Text style={styles.imageButtonText}>📷</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={currentMessage}
          onChangeText={setCurrentMessage}
          placeholder="Type a message..."
          multiline
        />
      <TouchableOpacity 
        style={styles.sendButton} 
        onPress={sendMessage}
        disabled={!currentMessage.trim() && !selectedImage}
      >
        <Text style={[
          styles.sendButtonText,
          (!currentMessage.trim() && !selectedImage) && { color: '#bcc0c4' }
        ]}>Send</Text>
      </TouchableOpacity>
      </View>
      {selectedImage && (
        <View style={styles.selectedImageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    safeArea: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1c1e21',
    marginLeft: 10,
  },
  onlineStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#31a24c',
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  messagesList: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  messageContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  senderContainer: {
    flexDirection: 'row-reverse',
  },
  receiverContainer: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginHorizontal: 8,
    position: 'relative',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  messageContent: {
    borderRadius: 20,
    padding: 12,
    maxWidth: '70%',
    marginHorizontal: 8,
  },
  senderContent: {
    backgroundColor: '#0084ff',
    marginLeft: 40,
  },
  receiverContent: {
    backgroundColor: '#f0f0f0',
    marginRight: 40,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#ffffff',
  },
  typingAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  typingText: {
    color: '#65676b',
    fontSize: 12,
    fontStyle: 'italic',
  },
  selectedImageContainer: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  senderText: {
    color: '#ffffff',
  },
  receiverText: {
    color: '#1c1e21',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
  },
  senderTimestamp: {
    color: '#ddd',
  },
  receiverTimestamp: {
    color: '#666',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  typingAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  typingText: {
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  imageButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  imageButtonText: {
    fontSize: 24,
    color: '#0084ff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 15,
    maxHeight: 100,
    color: '#1c1e21',
  },
  sendButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  sendButtonText: {
    color: '#0084ff',
    fontSize: 15,
    fontWeight: '600',
  },
  selectedImageContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default MessengerApp;