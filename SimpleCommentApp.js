import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';

// You can replace these with your actual image imports


const SimpleCommentApp = () => {
  const [comments, setComments] = useState([
    { id: 1, user: 'John', text: 'Great post!', time: '2m ago' },
    { id: 2, user: 'Sarah', text: 'Love this! 😍', time: '5m ago' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: 'You',
        text: newComment.trim(),
        time: 'now'
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <View style={styles.commentAvatar}>
        <Text style={styles.commentAvatarText}>
          {item.user.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.commentContent}>
        <View style={styles.commentBubble}>
          <Text style={styles.commentUser}>{item.user}</Text>
          <Text style={styles.commentText}>{item.text}</Text>
        </View>
        <Text style={styles.commentTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Simple Comment React Native</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              {/* Replace with actual Image component when you have the image */}
              {/* <Image source={profileImage} style={styles.profileImageStyle} /> */}
              <Text style={styles.profileImageText}>U</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>User Name</Text>
              <Text style={styles.profileTime}>2 hours ago</Text>
            </View>
          </View>

          {/* Post Image */}
          <View style={styles.postImageContainer}>
            {/* Replace with actual Image component when you have the image */}
            {/* <Image source={postImage} style={styles.postImage} /> */}
            <View style={styles.postImagePlaceholder}>
              <Text style={styles.postImageText}>Your Image Here</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={toggleLike}
              activeOpacity={0.7}
            >
              <Text style={[styles.actionIcon, liked && styles.likedIcon]}>
                {liked ? '❤️' : '🤍'}
              </Text>
              <Text style={[styles.actionText, liked && styles.likedText]}>
                {likeCount} Likes
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={toggleComments}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>💬</Text>
              <Text style={styles.actionText}>
                {comments.length} Comments
              </Text>
            </TouchableOpacity>
          </View>

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <View style={styles.inputAvatar}>
              <Text style={styles.inputAvatarText}>Y</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.commentInput}
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Add a comment..."
                placeholderTextColor="#999"
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !newComment.trim() && styles.sendButtonDisabled
                ]}
                onPress={addComment}
                disabled={!newComment.trim()}
                activeOpacity={0.7}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments Section */}
          {showComments && (
            <View style={styles.commentsSection}>
              <View style={styles.commentsSeparator} />
              <Text style={styles.commentsHeader}>Comments</Text>
              {comments.length === 0 ? (
                <View style={styles.noCommentsContainer}>
                  <Text style={styles.noCommentsText}>
                    No comments yet. Be the first to comment!
                  </Text>
                </View>
              ) : (
                <View style={styles.commentsList}>
                  {comments.map((comment) => (
                    <View key={comment.id}>
                      {renderComment({ item: comment })}
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileImageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  profileTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  postImageContainer: {
    marginBottom: 15,
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  postImagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#E879F9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  actionIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  likedIcon: {
    fontSize: 18,
  },
  likedText: {
    color: '#EF4444',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingVertical: 10,
  },
  inputAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  inputAvatarText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  commentsSection: {
    marginTop: 10,
  },
  commentsSeparator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  noCommentsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noCommentsText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  commentsList: {
    gap: 12,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  commentAvatarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  commentContent: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default SimpleCommentApp;
