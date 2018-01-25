const Conversations = [
  {
    withUserId: 1,
    messages: [
      {
        id: 0,
        type: 'in',
        from: {
            picture: require('../../assets/images/logoPascal.png'),
            name: 'Pascal'
        },
        time: -300,
        text: 'Bem vindo ao chat do Pascal!',
        media: {
          type: 'photo',
          url: require('../../assets/images/logoPascal.png'),
          width: 500,
          height: 281
        }
      }
      ]
  }
];




export default Conversations;