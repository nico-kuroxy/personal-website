/**********************************************************************************************************************/
//   author: Nicolas Erbetti
//   brief: This file defines the RosBridge react component.
//          It is used to establish the communication with the ros bridge server running server-side.
/**********************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> DEPENDENCIES
// Libraries
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import 'roslib/build/roslib'; // Required syntax to work in production.
// Contexts.
import { useLaboratory } from "../../context/LaboratoryProvider";
// Components.
// Utils.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//> COMPONENT
// Function declaration.
export default function RosBridge(props) {
    // Destructure the variables passed as argument.
    const {} = props
    // Destructure the context.
    const { ros, setRos, monitorRobotSrc, setMonitorRobotSrc, monitorRobotAerialSrc, setMonitorRobotAerialSrc, controller, controllerAxes, controllerButtons, jointStatesRef, robotOrientationRef } = useLaboratory()
    // Declare variables.
    const [position, setPosition] = useState({ x: 0, y: 0 })
    // Declre references.
    const cmdVelPubRef = useRef(null)
    const resetWorldServiceClientRef = useRef(null)
    // Use an Effect hook to update the cmdVel message when the joystick are handled through a gamepas.
    useEffect(() => {
        if (controller && controllerAxes) {
            setPosition({x: controllerAxes[0], y: -controllerAxes[1]})
        }
    }, [controller, JSON.stringify(controllerAxes)])
    // Publish Twist message whenever position changes
    useEffect(() => {
        // If the cmdVel publisher does not exist, we return immediately.
        if (!cmdVelPubRef.current) return
        // Otherwise, we create a twist message.
        const twistMsg = new ROSLIB.Message({
            linear: { x: position.y * 1.0, y: 0, z: 0} ,
            angular: { x: 0, y: 0, z: -position.x * 1.0 }})
        // And then we publish it.
        cmdVelPubRef.current.publish(twistMsg);
    }, [position])
    // Use an Effect hook to reset the world when the home button of the controller is pressed.
    useEffect(() => {
        // If the controller, its buttons, and the service client exists.
        if (controller && controllerButtons && resetWorldServiceClientRef.current) {
            // We check the status of the home button.
            if (controllerButtons[16]) {
                // If pressed, we create the empty request.
                var request = new ROSLIB.ServiceRequest({})
                // And we call the service to reset the world.
                resetWorldServiceClientRef.current.callService(request, function(result) {console.log('World reseted.')})
            }
        }
    }, [controller, JSON.stringify(controllerButtons)])
    // useEffect() hook are usually defined last in the component declaration. This one is loaded once upon the component's initialization.
    useEffect(() => {
        // Connect to ROS.
        // Use wss (web socket secure) instead of simple ws (websocket) to guarantee safety and be compatible with most browsers.
        // This requires the connection with the server to be configured accordingly, and the ip address to be set in the .env file.
        const ros = new ROSLIB.Ros({url: 'wss://' + process.env.NEXT_PUBLIC_ROS_IP + ':9090'})
        // Define the callback triggered when connected to ROS. This triggers twice in dev mode due to some cycles being triggered twice.
        ros.on('connection', () => { console.log('Connected to ROSBridge!'); setRos(true)})
        // Define the callback triggered if an error occured when connecting to ROS.
        ros.on('error', (error) => { console.error('Error connecting to ROSBridge:', error)})
        // Define the callback triggered when closing the ros connection.
        ros.on('close', () => { console.warn('Connection to ROSBridge closed.'); setRos(false)})
        // We create the camera image subscriber.
        const cameraSub = new ROSLIB.Topic({
            ros, name: 'camera/image_raw/compressed', messageType: 'sensor_msgs/CompressedImage'
        })
        // And we subscribe to it.
        cameraSub.subscribe((message) => {
            setMonitorRobotSrc(`data:image/jpeg;base64,${message.data}`)
        })
        // We create the aerial camera image subscriber.
        const cameraAerialSub = new ROSLIB.Topic({
            ros, name: 'camera_aerial/image_raw/compressed', messageType: 'sensor_msgs/CompressedImage'
        })
        // And we subscribe to it.
        cameraAerialSub.subscribe((message) => {
            setMonitorRobotAerialSrc(`data:image/jpeg;base64,${message.data}`)
        })
        // We create the joint subscriber.
        const jointSub = new ROSLIB.Topic({
            ros, name: 'joint_states', messageType: 'sensor_msgs/JointState'
        })
        // And we subscribe to it.
        jointSub.subscribe((message) => {
            message.name.forEach((name, i) => { jointStatesRef.current[name] = message.position[i] })
        })
        // We create the imu subscriber.
        const odomSub = new ROSLIB.Topic({
            ros, name: 'odom', messageType: 'nav_msgs/msg/Odometry'
        })
        // And we subscribe to it.
        odomSub.subscribe((message) => {
            // Retrieve quaternion
            const quaternion = new THREE.Quaternion(
                message.pose.pose.orientation.x,
                message.pose.pose.orientation.y,
                message.pose.pose.orientation.z,
                message.pose.pose.orientation.w
            )
            // Convert them to euler.
            const euler = new THREE.Euler()
            euler.setFromQuaternion(quaternion, 'ZYX')
            // Save orientation.
            robotOrientationRef.current = {
              x: euler.x,
              y: euler.y,
              z: euler.z
            }
        })
        // We create the twist publisher.
        const cmdVelPub = new ROSLIB.Topic({
            ros, name: 'cmd_vel', messageType: 'geometry_msgs/Twist'
        })
        // And we assign it to a ref, to access it from other components.
        cmdVelPubRef.current = cmdVelPub
        // We create the reset world service.
        const resetWorldServiceClient = new ROSLIB.Service({
            ros : ros, name : '/reset_world', serviceType : 'std_msgs/srv/Empty'
        })
        // And we assign it to a ref, to access it from other components.
        resetWorldServiceClientRef.current = resetWorldServiceClient
        // Properly clean the component when it is unmounted.
        return () => {
            if (ros?.isConnected) {
                // Unsubscribing every topic.
                cameraSub.unsubscribe()
                cameraAerialSub.unsubscribe()
                jointSub.unsubscribe()
                odomSub.unsubscribe()
                // Unadvertising every topic.
                cmdVelPub.unadvertise()
                // Unadvertise every service client.
                resetWorldServiceClient.unadvertise()
                // Closing the ros connection.
                ros.close()
            }
        }
    }, [])

    // Return the html.
    return (
        <></>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////