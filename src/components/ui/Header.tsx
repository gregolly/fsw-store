"use client"

import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, PercentIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { signIn, signOut } from "next-auth/react";

import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";

import Link from 'next/link'
import { Cart } from "./cart";

export const Header = () => {
    const { status, data } = useSession()

    const handleLoginClick = async () => {
        await signIn()
    }

    const handleLogoutClick = async () => {
        await signOut()
    }

    return (
        <Card className="flex justify-between p-[1.875rem] items-center">
            <Sheet>
                 <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <MenuIcon />
                    </Button>
                 </SheetTrigger>

                    
                <SheetContent side="left">
                    <SheetHeader className="text-left text-lg font-semibold">
                        Menu
                    </SheetHeader>

                    {status === 'authenticated' && data.user && (
                        <>
                            <div className="flex items-center gap-2 py-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {data.user?.name?.[0].toUpperCase()}
                                    </AvatarFallback>

                                    {data.user.image && (
                                        <AvatarImage src={data.user.image} />
                                    )}
                                </Avatar>

                                <div className="flex flex-col">
                                    <p className="font-medium text-gray-300">{ data.user.name }</p>
                                    <p className="text-gray-500 text-sm">Boas compras!</p>
                                </div>
                            </div>

                            <Separator className="mb-4" />
                        </>
                    )}

                    <div className="mt-2 flex flex-col gap-3">
                        <SheetClose asChild>
                            <Link href="/">
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <HomeIcon size={16} />
                                    Inicio
                                </Button>
                            </Link>
                        </SheetClose>

                        <SheetClose asChild>
                            <Link href="/deals">
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <PercentIcon size={16} />
                                    Ofertas
                                </Button>
                            </Link>
                        </SheetClose>

                        <SheetClose asChild>
                            <Link href="/catalog">
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <ListOrderedIcon size={16} />
                                    Catalogo
                                </Button>
                            </Link>
                        </SheetClose>

                        {status === 'unauthenticated' ? (
                            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLoginClick}>
                                <LogInIcon size={16} />
                                Fazer Login
                            </Button>
                        ) : (
                            <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogoutClick}>
                                <LogOutIcon size={16} />
                                Fazer Logout
                            </Button>
                        )}
                    </div>
                </SheetContent>
            </Sheet>


            <Link href="/">
                <h1 className="font-semibold text-lg">
                    <span className="text-primary">FSW</span> Store
                </h1>
            </Link>

            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline">
                        <ShoppingCartIcon />
                    </Button>
                </SheetTrigger>

                <SheetContent>
                    <Cart />
                </SheetContent>
            </Sheet>
        </Card>
    )
}