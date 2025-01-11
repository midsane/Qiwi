import { avatar1, npc1, npc2, NPCMsg } from "@/data/data"
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

const NpcAtom = atom({
    key: "npcAtom",
    default: {
        image: npc1,
        msg: NPCMsg[0]
    }
})

const userIdAtom = atom ({
    key: "userIdAtom",
    default: "",
})

export{
    avatarAtom,
    usernameAtom,
    LoaderMsgAtom,
    LoaderAtom,
    ToastMsgAtom,
    NpcAtom,
    userIdAtom
}