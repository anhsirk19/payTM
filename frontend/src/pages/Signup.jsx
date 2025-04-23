import { BottomWarning  } from "../components/BottomWarning.jsx";
import { Button } from "../components/Button.jsx";
import { Heading } from "../components/Heading.jsx";
import { InputBox } from "../components/InputBox.jsx";
import { SubHeading } from "../components/SubHeadin.jsx";

export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 textcenter p-2 max-h px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox placeholder={"John"} label={"First Name"}/>
                <InputBox placeholder={"Doe"} label={"Last Name"}/>
                <InputBox placeholder={"anhsirk@gmail.com"} label={"Email"}/>
                <InputBox placeholder={"123456"} label={"Password"}/>
                <div className="pt-4">
                    <Button label={"Sign up"}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}