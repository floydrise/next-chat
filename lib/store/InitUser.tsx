"use client"

import {useEffect, useRef} from "react";
import {User} from "@supabase/auth-js";
import {useUser} from "@/lib/store/user";

export const InitUser = ({user} : {user: User|null}) => {
    const initState = useRef(false);
    useEffect(() => {
      if (!initState.current) {
        useUser.setState({ user });
      }

      initState.current = true;
    }, [user]);

    return <></>;
};
