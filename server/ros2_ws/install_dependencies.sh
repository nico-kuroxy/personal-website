#!/bin/bash

#   author: Nicolas Erbetti
#   brief: This file takes care of downloading and installing every package 
#          required by the web server laboratory.
#	   If the installation looks like it's stuck at some point, try to do CTL+D.

################################
# PACKAGES INSTALLATION ########
################################

# Update the packages.
sudo apt update

# Install the ROS2 packages.
sudo apt install -y \
  ros-humble-desktop-full \
  ros-humble-turtlebot3* \
  ros-humble-rosbridge-server

################################
# BASHRC SETUP ########
################################

# Defint the ros distro to be sourced in every terminal.
echo 'source /opt/ros/humble/local_setup.bash' >> ~/.bashrc
# Define the turtlebot model used in the simulation.
echo 'export TURTLEBOT3_MODEL=burger_cam' >> ~/.bashrc
echo 'export GAZEBO_MODEL_PATH=$GAZEBO_MODEL_PATH:/opt/ros/humble/share/turtlebot3_gazebo/models' >> ~/.bashrc
echo 'export GAZEBO_PLUGIN_PATH=$GAZEBO_PLUGIN_PATH:/opt/ros/humble/lib' >> ~/.bashrc
echo 'source /usr/share/gazebo/setup.sh' >> ~/.bashrc
echo 'source /usr/share/gazebo-11/setup.sh' >> ~/.bashrc
echo 'source /usr/share/gazebo-11/setup.bash' >> ~/.bashrc
# Source the bashrc.
source ~/.bashrc

# To start the simulation : ros2 launch turtlebot3_gazebo_custom turtlebot3_world.launch.py
# To start the webserver : ros2 launch rosbridge_server rosbridge_websocket_launch.xml 
# To start a (dev) secure webserver : ros2 launch rosbridge_server rosbridge_websocket_launch.xml port:=9090 ssl:=true certfile:=/mnt/c/Users/nerbe/Development/kuroxy-personal-website/certificates/cert.pem keyfile:=/mnt/c/Users/nerbe/Development/kuroxy-personal-website/certificates/key.pem authenticate:=false

# To generate a temporary certificate : openssl req -x509 -nodes -days 365 -newkey rsa:2048   -keyout key.pem -out cert.pem   -subj "/CN=192.168.1.16"   -addext "subjectAltName=IP:192.168.1.16"
# To start a cloudflare ssl tunnel : cloudflared tunnel run rosbridge-tunnel