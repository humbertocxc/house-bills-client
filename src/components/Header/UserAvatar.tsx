"use client"
import Avatar from "react-avatar"

interface IUser {
  name: string
}

export default function UserAvatar({ name }: IUser) {
  return (
    <Avatar name={name} round size="50" color="rgb(124 45 18 / 0.9)" />
  )
}
