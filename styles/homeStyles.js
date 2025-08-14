import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1, padding: 20,
  },
  // باقي الستايلات
  appBar: {
    backgroundColor: '#00629B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  ImageBackground:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
    
    
  },
  logo: { width: 60, height: 60, resizeMode: 'contain', padding:5,  },
  icon: { width: 35, height: 35, resizeMode: 'contain', padding:5,},
  card: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderRadius: 12,
    margin: 20,
    alignItems: 'center',
    elevation: 3,
    justifyContent: 'center',
    // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.20,
  shadowRadius: 3.84,
  
  },
  cardText: { fontSize: 16, textAlign: 'center', padding:10, },
  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff', padding: 5, borderRadius: 15, width: '80%', alignItems: 'center'
  },
  flagRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 20,
  },
  flagIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',

  },
  flagText: {
    alignItems: 'flex',
    justifyContent: 'center',
    fontSize: 14,
    color: '#333',
    flex: 1,
    padding: 20,
  },
  footerText: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
    marginBottom: 20,
  },
  accountBox: {
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignSelf: 'center',
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  team: {
    fontSize: 14,
    color: '#555',
   
  },
  popupContainer: {
    position: 'absolute',
    marginTop: 50,
    top: 50,
    right: 10,
    backgroundColor: '#EEEEEE',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

