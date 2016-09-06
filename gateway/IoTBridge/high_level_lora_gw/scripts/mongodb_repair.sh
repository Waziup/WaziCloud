#!/bin/bash

#-------------------------------------------------------------------------------
# Copyright 2016 Nicolas Bertuol, University of Pau, France.
# 
# nicolas.bertuol@etud.univ-pau.fr
#
# This file is part of the low-cost LoRa gateway developped at University of Pau
#
# Contact: Congduc.Pham@univ-pau.fr
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with the program.  If not, see <http://www.gnu.org/licenses/>.
#-------------------------------------------------------------------------------

LOCK_FILE=/var/lib/mongodb/mongod.lock
PID_FILE=/var/run/mongodb.pid

mongo_running=0

#if mongodb.lock and mongodb.pid are different, then need to repair
pid=`cat $PID_FILE`
lock=`cat $LOCK_FILE`
if [ $lock == $pid ]; then
  mongo_running=1
fi

if [ $mongo_running == 1 ]; then
  echo "Mongo already running pid:$pid"
  exit 0
fi

echo "Mongo is not running. Starting to repair."

if [ -f $LOCK_FILE ]; then
  echo -n "Removing lock_file:$LOCK_FILE..."
  sudo rm $LOCK_FILE
  echo "done."
fi

echo "Repairing mongodb..."
mongod --repair
echo "done, starting mongodb..."
sudo service mongod start
