import { CopyrightIcon } from "lucide-react"

export const Footer = () => {
    return (
        <footer className="flex gap-1 bg-slate-900 items-center px-8 py-5 text-slate-400 mt-14">
            <CopyrightIcon size={16} /> 2023 Copyright FSW Store
        </footer>
    )
}