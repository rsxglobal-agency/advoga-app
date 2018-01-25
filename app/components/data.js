import { API_URL_TST, API_URL_PRD, API_URL_LOCAL, PICTURE_URL } from 'react-native-dotenv';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
var FormData = require('form-data');

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: API_URL_TST,
      timeout: 60000,
    });

    this.api.interceptors.response.use(response => {
      if (response.data.success) {
        if (response.data.data !== undefined) {
          return Promise.resolve(response.data.data);
        }
        else {
          return Promise.resolve(response.data.total);
        }
      } else {
        return Promise.reject(response);
      }
    }, error => {
      console.log('error');
      return Promise.reject(error);
    });
  }

  getToken() {
    return AsyncStorage.getItem('appToken');
  }

  getPushNotifToken() {
    return AsyncStorage.getItem('pushNotifToken');
  }

  setToken(userToken) {
    AsyncStorage.setItem('appToken', userToken);
  }

  setPushNotifToken(pushNotifToken) {
    AsyncStorage.setItem('pushNotifToken', pushNotifToken);
  }

  removeToken() {
    AsyncStorage.removeItem('appToken');
    AsyncStorage.removeItem('user');
  }

  setTokenInHeader(token) {
    this.api.defaults.headers.common['x-access-token'] = token;

    this.setUserData();
  }

  async setUserData() {
    let user = await this.userId();
    user = user[0];
    user["userUrlId"] = null;
    user["userUrlThn"] = null;
    if ((user.thumbnailUrl != null) && (user.thumbnailUrl.indexOf('wwww') == -1) && (user.thumbnailUrl.indexOf('http') == -1)) {

      var thumbnailUrlTmp = decodeURIComponent(user.thumbnailUrl);
      user.userUrlId = thumbnailUrlTmp.substring(thumbnailUrlTmp.indexOf('/') + 1, thumbnailUrlTmp.lastIndexOf('.'));
      user.userUrlThn = PICTURE_URL + encodeURIComponent(thumbnailUrlTmp) + '?alt=media';
    }

    AsyncStorage.setItem('user', JSON.stringify(user));

    return user;
  }

  async loadUserData() {
    let user = JSON.parse(await AsyncStorage.getItem('user'));

    if (!user) {
      user = await this.setUserData();
    }
    return user;
  }

  login(inUsername, inPassword) {
    return this.api.get('/users/signin', {
      params: {
        username: inUsername,
        password: inPassword,
      },
    });
  }

  account(inUsername, inPassword, inUrlAvatar, inThumbnailUrl, inEmail, inLatitude, inLongitude) {
    return this.api.get('/users/signup', {
      params: {
        username: inUsername,
        password: inPassword,
        urlAvatar: inUrlAvatar,
        thumbnailUrl: inThumbnailUrl,
        email: inEmail,
        latitude: inLatitude,
        longitude: inLongitude,
      },
    });
  }

  hasUser(inUsername) {
    return this.api.get('/users/hasUser', {
      params: {
        username: inUsername,
      },
    });
  }

  saveUserAvatar(inUrlAvatar, inThumbnailUrl) {
    return this.api.get('/users/save', {
      params: {
        urlAvatar: inUrlAvatar,
        thumbnailUrl: inThumbnailUrl,
      },
    });
  }

  saveUserNotificationToken(inNotificationToken, inDeviceType) {
    return this.api.get('/users/saveNotificationToken', {
      params: {
        notificationToken: inNotificationToken,
        deviceType: inDeviceType
      },
    });
  }

  userList(inPage) {
    return this.api.get('/users/list', {
      params: {
        page: inPage,
        order: 'totalViews',
      },
    });
  }

  followingUser(inTotal, inAppUserId, inPage) {
    return this.api.get('/users/following', {
      params: {
        total: inTotal,
        appUserId: inAppUserId,
        page: inPage,
      },
    });
  }

  followersUser(inTotal, inAppUserId, inPage) {
    return this.api.get('/users/followers', {
      params: {
        total: inTotal,
        appUserId: inAppUserId,
        page: inPage,
      },
    });
  }

  saveBulkFollowUser(inBulkFollowId) {
    return this.api.get('/users/saveBulkFollowUser', {
      params: {
        bulkFollowId: inBulkFollowId,
      },
    });
  }

  saveFollowUser(inFollowAppUserId) {
    return this.api.get('/users/saveFollow', {
      params: {
        followAppUserId: inFollowAppUserId,
      },
    });
  }

  userId(userId) {
    return this.api.get('/users/userId', userId ? {
      params: {
        id: userId,
      },
    } : {});
  }

  mutualFollower() {
    return this.api.get('/users/mutualFollower');
  }

  postList(inFirstDate, inLastDate, inNoFollowing) {
    if (inFirstDate !== '') {
      return this.api.get('/posts/list', {
        params: {
          pageSize: 30,
          firstDate: inFirstDate,
          removeAdvertisements: true,
          noFollowing: inNoFollowing,
        },
      });
    }
    else {
      return this.api.get('/posts/list', {
        params: {
          pageSize: 30,
          lastDate: inLastDate,
          removeAdvertisements: true,
          noFollowing: inNoFollowing,
        },
      });
    }
  }

  postId(postId) {
    return this.api.get('/posts/postId', {
      params: {
        id: postId,
      },
    });
  }

  savePost(inPostId, inPictureUrl, inPictureWidth, inPictureHeight, inThumbnailUrl, inDescription, inShopItems, inHashtags, inVideoUrl, inLatitude, inLongitude) {
    const body = {
      id: inPostId,
      pictureUrl: inPictureUrl,
      pictureWidth: inPictureWidth,
      pictureHeight: inPictureHeight,
      thumbnailUrl: inThumbnailUrl,
      description: inDescription,
      shopItems: inShopItems,
      hashtags: inHashtags,
      videoUrl: inVideoUrl,
      latitude: inLatitude,
      longitude: inLongitude,
    };

    return this.api.post('/posts/save', body, {headers: {'content-type': 'application/json'}});
  }

  deletePostId(postId) {
    return this.api.get('/posts/delete', {
      params: {
        id: postId,
      },
    });
  }

  rePost(inPostId) {

    return this.api.get('/posts/rePost', {
      params: {
        id: inPostId,
      },
    });
  }

  postsUser(inUserId, inPage) {
    return this.api.get('/posts/postsUser', {
      params: {
        appUserId: inUserId,
        page: inPage,
      },
    });
  }

  shopItems(inPostId) {
    return this.api.get('/posts/shopItems', {
      params: {
        postId: inPostId,
      },
    });
  }

  deleteShopItem(inShopItemId) {
    return this.api.get('/posts/deleteShopItem', {
      params: {
        shopItemId: inShopItemId,
      },
    });
  }

  favoritePosts() {
    return this.api.get('/posts/favoritePosts');
  }

  saveFavorite(inPostId) {
    return this.api.get('/posts/saveFavorite', {
      params: {
        postId: inPostId,
      },
    });
  }

  likesUser(inPostId, inPage) {

    return this.api.get('/posts/likes', {
      params: {
        postId: inPostId,
        page: inPage,
      },
    });
  }

  saveLike(inPostId) {
    return this.api.get('/posts/saveLike', {
      params: {
        postId: inPostId,
      },
    });
  }

  discoveryUsers(inSearchKey, inPage) {

    return this.api.get('/users/discoveryNew', {
      params: {
        searchKey: inSearchKey,
        page: inPage,
      },
    });
  }

  discoveryPosts(inSearchKey, inPage) {
    
    return this.api.get('/posts/discoveryNew', {
      params: {
        searchKey: inSearchKey,
        page: inPage,
      },
    });
  }

  discoveryTrendings(inPage) {
    
    return this.api.get('/posts/discoveryTrendings', {
      params: {
        page: inPage,
      },
    });
  }

  discoveryViews(inPage) {
    
    return this.api.get('/posts/discoveryViews', {
      params: {
        page: inPage,
      },
    });
  }

  discoveryLikes(inPage) {
    
    return this.api.get('/posts/discoveryLikes', {
      params: {
        page: inPage,
      },
    });
  }

  discoveryFavorites(inPage) {
    
    return this.api.get('/posts/discoveryFavorites', {
      params: {
        page: inPage,
      },
    });
  }

  discoveryFresh(inPage) {
    
    return this.api.get('/posts/discoveryFresh', {
      params: {
        page: inPage,
      },
    });
  }

  discoveryMainUsers(inPage) {
    
    return this.api.get('/users/discoveryMainUsers', {
      params: {
        page: inPage,
      },
    });
  }

  comment(inPostId, inPage) {
    return this.api.get('/posts/comments', {
      params: {
        postId: inPostId,
        page: inPage,
      },
    });
  }

  saveComment(inPostId, inDescription) {
    const body = {
      postId: inPostId,
      description: inDescription,
    };

    return this.api.post('/posts/saveComment', body, {headers: {'content-type': 'application/json'}});
  }

  deleteComment(inCommentId) {
    return this.api.get('/posts/deleteComment', {
      params: {
        id: inCommentId,
      },
    });
  }

  toReport(inResource, inType, inKey) {
    return this.api.get('/reports/save', {
      params: {
        resource: inResource,
        type: inType,
        key: inKey,
      },
    });
  }

  uploadVideo(inName, inUri, inWidth, inHeight) {

    let fileType = inName.substring(inName.lastIndexOf('.') + 1, inName.length);

    let formData = new FormData();
    formData.append('video', {uri: inUri, name: inName, type: `video/${fileType}`});
    formData.append('width', inWidth);
    formData.append('height', inHeight);

    return this.api.post('/storage/uploadVideo', formData, {headers: {'content-type': 'multipart/form-data'}});
  }

  uploadImage(inName, inUri, inFileType, inFolder, inIsThumbnail) {

    let formData = new FormData();
    formData.append('image', {uri: inUri, name: inName, type: `image/${inFileType}`});
    formData.append('folder', inFolder);
    formData.append('isThumbnail', inIsThumbnail);

    return this.api.post('/storage/uploadImage', formData, {headers: {'content-type': 'multipart/form-data'}});
  }

  bulkFollow(inPage) {
    return this.api.get('/bulks/list', {
      params: {
        page: inPage,
      },
    });
  }

  pushNotifications(inAppUserId, inMessage, inPostId, inPostCommentId, inOriginAppUserId, inType) {
    const body = {
      appUserId: inAppUserId,
      message: inMessage,
      postId: inPostId,
      postCommentId: inPostCommentId,
      originAppUserId: inOriginAppUserId,
      type: inType,
    };

    return this.api.post('/pushNotifications/send', body, {headers: {'content-type': 'application/json'}});
  }

  pulseList(inPage) {
    return this.api.get('/pushNotifications/list', {
      params: {
        page: inPage,
      },
    });
  }

  passwordRecovery(inUsername) {
    const body = { username: inUsername };

    return this.api.post('/sendEmails/passwordRecovery', body, {headers: {'content-type': 'application/json'}});
  }
}

export default (new Api());
  