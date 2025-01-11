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

const moodAtom = atom ({
    key: "moodAtom",
    default: {
        responded: false    ,
        date:"",
        eneryLevel: "",
        mood: "",
    }
})

const moodEnergyScoreAtom = atom({
    key: "moodScoreAtom",
    default: {
        mood: 0,
        energy: 0
    }
})


const BadgeListAtom = atom({
    key: "BadgeListAtom",
    default: {
        fetched: false,
        list: []
    }
})

export{
    BadgeListAtom,
    avatarAtom,
    usernameAtom,
    LoaderMsgAtom,
    LoaderAtom,
    ToastMsgAtom,
    NpcAtom,
    userIdAtom,
    moodAtom,
    moodEnergyScoreAtom
}