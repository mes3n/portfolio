FROM alpine:latest

RUN apk add openssh sshpass

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
