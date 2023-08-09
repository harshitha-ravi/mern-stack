import Student from "../domain/Student.js";

/* Creating READ Functions */
export const getStudent = async (req, res) => {
    try{
        // id will be sent as a req param
        const { id } = req.params;
        const student = await Student.findById(id);

        // TODO: can add a validation check if the student object obtained from mongo is null or not
        res.status(200).json(student);
    }catch(err){
        res.status(404).json({error : err.message});
    }
}; 

/** This function will fetch all the info about the list of connections for a given student */
export const getStudentConnections = async (req, res) => {
    try{
        // fetch the id from the req param
        const { id } = req.params;
        const student = await Student.findById(id);

        // fetch the connections info from  the student object
        const connections = await Promise.all(
            // For each connection id -> fetch the connection details
            student.connections.map((id) => Student.findById(id))
        );

        // format the output
        const formattedConnections = connections.map(
            ({ _id, firstName, lastName, address, profileImage }) => {
                return { _id, firstName, lastName, address, profileImage };
            }
        );
    
        res.status(200).json(formattedConnections); 

    }catch(err){
        res.status(404).json({error: err.message});
    }
};

/** UPDATE Function - addRemoveConnection
 * Step 1: Filter the connection list of both student and connection
 * Step 2 : for the given student -> based on the filtered connection list,
 *          fetch the conection objects, format it and return in the response
 */

export const addRemoveConnection = async (req, res) => {
    try{
        // extract both student id and connnection id from the request param
        const { studentId, connectionId } = req.params; 

        // Fetch both the student and connection object based on their respective ids
        const student = await Student.findById(studentId);
        const connection = await Student.findById(connectionId);

        /** Check if the student connectionList includes(Similar to contains in Java)
         given connection id
         * If YES - the filter the connectionList to not include connectionId and return it
         * TODO NOTE DEBUG and CHECK - The mongoDB filed connections is not updated here -> to remove 
         * the connectionId from the list.
         * For now -> just filtering and sending the updated connections list
         * 
         * if NO - Then the actual mongo PUSH is done to update the connections array
         * with the connectionId
         */
        if(student.connections.includes(connectionId)){
            // Update done at both places

            // updating the connections array in student object
            student.connections = student.connections.filter( (id) => id !== connectionId);

            // updating the connections array in connection object
            connection.connections = connection.connections.filter( (id) => id !== studentId );

            // TODO : update the mongo database. NOT SURE. debug and check whether required
        }else{
            // If one of them adds -> it gets added to both. same with remove functionality 
            student.connections.push(connectionId);
            connection.connections.push(studentId); 
        }
         
        // Saving the updated list - could be saving to mongo - debug and check
        await student.save();
        await connection.save();

        // fetch the connections info from  the student object
        const connections = await Promise.all(
            // For each connection id -> fetch the connection details
            student.connections.map((id) => Student.findById(id))
        );

        // format the output
        const formattedConnections = connections.map(
            ({ _id, firstName, lastName, address, profileImage }) => {
                return { _id, firstName, lastName, address, profileImage };
         }
        );

    }catch(err){
        res.status(404).json({error : err.message});
    }

};