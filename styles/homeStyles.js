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
  logo: { width: 60, height: 60, resizeMode: 'contain', padding:5 },
  icon: { width: 35, height: 35, resizeMode: 'contain', padding:5 },
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
});

