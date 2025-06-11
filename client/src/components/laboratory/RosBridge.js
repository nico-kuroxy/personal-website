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
    const { ros, setRos, monitorImgSrc, setMonitorImgSrc, controller, controllerAxes, controllerButtons, jointStatesRef, robotOrientationRef, whichView, setWhichView, joystickButton, setJoystickButton } = useLaboratory()
    // Declare variables.
    const [position, setPosition] = useState({ x: 0, y: 0 })
    // Declare references.
    const rosRef = useRef(null)
    const cameraSubRef = useRef(null)
    const cmdVelPubRef = useRef(null)
    const resetWorldServiceClientRef = useRef(null)
    // Declare functions to switch video stream subscribtion (to limit bandwith usage).
    const subscribeToImageTopic = (whichView) => {
        // Safeguards: if ros is not already connected (when the component is first mounted), we return.
        if (!rosRef.current) return
        // Declare variables
        let cameraSub = null
        // If the cameraSub is already subscribed, we unsubscribe it and clear it.
        if (cameraSubRef.current) {
            cameraSubRef.current.unsubscribe()
            cameraSubRef.current = null
        }
        // If we have the robot view, we subscribe to the regular camera.
        if (whichView === "Robot View") {
            // We create the camera image subscriber.
            cameraSubRef.current = new ROSLIB.Topic({
                ros: rosRef.current, name: 'camera/image_raw/compressed', messageType: 'sensor_msgs/CompressedImage'
            })
            // And we subscribe to it.
            cameraSubRef.current.subscribe((message) => {
                setMonitorImgSrc(`data:image/jpeg;base64,${message.data}`)
            })
        } else if (whichView === "Aerial View") {
            // Otherwise, we create the aerial camera image subscriber.
            cameraSubRef.current = new ROSLIB.Topic({
                ros: rosRef.current, name: 'camera_aerial/image_raw/compressed', messageType: 'sensor_msgs/CompressedImage'
            })
            // And we subscribe to it.
            cameraSubRef.current.subscribe((message) => {
                setMonitorImgSrc(`data:image/jpeg;base64,${message.data}`)
            })
        } else {
            // Otherwise, we log an error and we return.
            console.error("Invalid whichView selected", whichView)
            return
        }
    }
    // Use an Effect hook to update the image subscriber when the view mode changes.
    useEffect(() => {
        // Subscribe to another topic when whichView changes.
        subscribeToImageTopic(whichView)
    }, [whichView])
    // Use an Effect hook to update the cmdVel message when the joystick are handled through a gamepas.
    useEffect(() => {
        if (controllerAxes) {
            setPosition({x: controllerAxes[0], y: -controllerAxes[1]})
        }
    }, [controller, controllerAxes?.[0], controllerAxes?.[1]])
    // Publish Twist message whenever position changes
    useEffect(() => {
        // If the cmdVel publisher does not exist, we return immediately.
        if (!cmdVelPubRef.current) return
        // Otherwise, we create a twist message.
        const twistMsg = new ROSLIB.Message({
            linear: { x: position.y, y: 0, z: 0} ,
            angular: { x: 0, y: 0, z: ((position.y <= -0.5) && controller) || ((position.y <= 0) && !controller) ? position.x : -position.x }})
        // And then we publish it.
        console.log(position.y)
        cmdVelPubRef.current.publish(twistMsg);
    }, [position])
    // Use an Effect hook to reset the world when the home button of the controller is pressed.
    useEffect(() => {
        // If the controller, its buttons, and the service client exists.
        if (resetWorldServiceClientRef.current) {
            // We check the status of the home button or the reset button of the virtual joystick.
            if (controllerButtons[16] || joystickButton) {
                // If pressed, we create the empty request.
                var request = new ROSLIB.ServiceRequest({})
                // And we call the service to reset the world.
                resetWorldServiceClientRef.current.callService(request, function(result) {console.log('World reseted.')})
                // And we reset the joystick button if pressed.
                if (joystickButton) setJoystickButton(false)
            }
            // We check the status of the left trigger.
            if (controllerButtons[6]) {
                // If pressed, we update the view.
                setWhichView("Robot View")
            }
            // We check the status of the right trigger.
            if (controllerButtons[7]) {
                // If pressed, we update the view.
                setWhichView("Aerial View")
            }
        }
    }, [controller, JSON.stringify(controllerButtons), joystickButton])
    // useEffect() hook are usually defined last in the component declaration. This one is loaded once upon the component's initialization.
    useEffect(() => {
        // Connect to ROS... or return immediately if it already exists, to avoid issues in dev mode since react renders it twice.
        if (rosRef.current) return
        // Use wss (web socket secure) instead of simple ws (websocket) to guarantee safety and be compatible with most browsers.
        // This requires the connection with the server to be configured accordingly, and the ip address to be set in the .env file.
        const ros = new ROSLIB.Ros({url: 'wss://' + process.env.NEXT_PUBLIC_ROS_IP})
        // Assign it to the ref.
        rosRef.current = ros
        // Define the callback triggered when connected to ROS. This triggers twice in dev mode due to some cycles being triggered twice.
        rosRef.current.on('connection', () => { console.log('Connected to ROSBridge!'); setRos(true)})
        // Define the callback triggered if an error occured when connecting to ROS.
        rosRef.current.on('error', (error) => { console.error('Error connecting to ROSBridge:', error)})
        // Define the callback triggered when closing the ros connection.
        rosRef.current.on('close', () => { console.warn('Connection to ROSBridge closed.'); setRos(false)})
        // We create the camera subscriber.
        subscribeToImageTopic(whichView)
        // We create the joint subscriber.
        const jointSub = new ROSLIB.Topic({
            ros: rosRef.current, name: 'joint_states', messageType: 'sensor_msgs/JointState'
        })
        // And we subscribe to it.
        jointSub.subscribe((message) => {
            message.name.forEach((name, i) => { jointStatesRef.current[name] = message.position[i] })
        })
        // We create the imu subscriber.
        const odomSub = new ROSLIB.Topic({
            ros: rosRef.current, name: 'odom', messageType: 'nav_msgs/msg/Odometry'
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
        cmdVelPubRef.current = new ROSLIB.Topic({
            ros: rosRef.current, name: 'cmd_vel', messageType: 'geometry_msgs/Twist'
        })
        // We create the reset world service.
        resetWorldServiceClientRef.current = new ROSLIB.Service({
            ros: rosRef.current, name : '/reset_world', serviceType : 'std_msgs/srv/Empty'
        })
        // Properly clean the component when it is unmounted.
        return () => {
            if (rosRef.current?.isConnected) {
                // Unsubscribing every topic.
                cameraSubRef.current?.unsubscribe()
                jointSub.unsubscribe()
                odomSub.unsubscribe()
                // Unadvertising every topic.
                cmdVelPubRef.current?.unadvertise()
                // Unadvertise every service client.
                resetWorldServiceClientRef.current?.unadvertise()
                // Closing the ros connection.
                rosRef.current?.close()
                // Reset the ref.
                rosRef.current = null
            }
        }
    }, [])
    // Return the html.
    return (
        <></>
    )
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////