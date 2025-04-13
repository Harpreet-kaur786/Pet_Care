import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      padding: 20,
      //alignItems: 'center',
      backgroundColor: '#FFF3E0',
    },
    profileImage: {
      width: 200,
      height: 200,
      borderRadius: '100%',  
      marginVertical: 20,
    },
    align: {
      alignItems: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 12,
      color: "#444",
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 20,
      color: "#007AFF",
    },
    infoContainer: {
      alignSelf: "stretch",
      alignItems: "center",
    },
    info: {
      fontSize: 16,
      color: "#666",
      textAlign: "left",
      width: "85%",
    },
    input: {
      borderBottomWidth: 1,
      width: "85%",
      fontSize: 18,
      marginVertical: 8,
      paddingVertical: 5,
      borderColor: "#ccc",
    },
    addButton: {
      fontSize: 18,
      color: "#007AFF",
      marginTop: 12,
      fontWeight: "500",
    },
    btn: {
      marginTop: 10,
      marginBottom: 10,
      width: "50%",
      alignItems: "center",
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: 20,
    },
    modalContainer: {
      backgroundColor: "white",
      padding: 25,
      borderRadius: 12,
      width: "85%",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    },
    modalLabel: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#444",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "50%",
      marginTop: 15,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    },
    deleteButton: {
      color: "red",
    },
    centeredSection: {
      alignItems: "center",
    },
    headerContainer: {
      width: '100%',
      backgroundColor: '#4CAF50',
      paddingVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10
  },
  headerText: {
      fontSize: 20,  
      fontWeight: 'bold',
      color: 'white',
  },
  divider: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginTop: 10,
  },
  mealplanButton: {
    //backgroundColor: "#3b8132", // Green color
    backgroundColor: "#2196F3", //Blue color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5, // Add spacing between buttons
    flex: 1, // Makes both buttons take equal width
  },
  mealplanButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  mealplanButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Adjust spacing
    alignItems: "center",
    marginTop: 10,
  },
  gradientContainer: {
    flex: 1,
  },
  
  scrollContent: {
    padding: 20,
  },
  });

  export default styles;