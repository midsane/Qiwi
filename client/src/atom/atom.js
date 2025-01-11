import { avatar1 } from "@/data/data"
import { atom } from "recoil"

const usernameAtom = atom({
    key: "usernameAtom",
    default: "username"
})

const avatarAtom = atom({
    key: "avatarAtom",
    default: avatar1
})

const LoaderAtom = atom({
    key:"loaderAtom",
    default: false
})

const LoaderMsgAtom = atom ({
    key: "loaderMsgAtom",
    default: "loading..."
})

const ToastMsgAtom = atom({
    key: "toastMsgAtom",
    default: ""
})

export{
    avatarAtom,
    usernameAtom,
    LoaderMsgAtom,
    LoaderAtom,
    ToastMsgAtom
}