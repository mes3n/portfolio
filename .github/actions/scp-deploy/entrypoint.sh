#!/bin/sh

var_is_unset() {
	echo "$1 is not set. Set it with ./script.sh $1=value." 1>&2
	[ "$2" = "set" ] || exit 1
	echo "Using default $1=$3."
	export "$1"="$3"
}

for arg in "$@"; do
	KEY=$(echo $arg | cut -f1 -d=)
	VAL=${arg:${#KEY}+1}
	export "$KEY"="$VAL"
done

for needed in user target host_path target_dest; do
	[ "$(eval echo "\$$needed")" ] || var_is_unset $needed
done
[ "$port" ] || var_is_unset port set 22

login="$user@$target"
options="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
[ "$password" ] && sshpasscmd="sshpass -p $password"

sshoption="$options -p $port"
sshcmd="$sshpasscmd ssh $sshoption $login"
[ "$replace" ] && $sshcmd "rm -rf $target_dest"
$sshcmd "mkdir -p $(dirname $target_dest)"

scpoptions="$options -r -P $port"
scpcmd="$sshpasscmd scp $scpoptions $host_path $login:$target_dest"
$scpcmd
