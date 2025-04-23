import { BottomWarning  } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeadin";

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 textcenter p-2 max-h px-4">
                <Heading label={"Sign in"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox placeholder={"anhsirk@gmail.com"} label={"Email"}/>
                <InputBox placeholder={"123456"} label={"Password"}/>
                <div className="pt-4">
                    <Button label={"Sign in"}/>
                </div>
                <BottomWarning label={"Don`t have an account?"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}