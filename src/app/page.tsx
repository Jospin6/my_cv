"use client"

import { Navbar } from "@/components/navibar/navbar";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";// Adjust the path based on your project structure
import { ArrowUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCv, selectCvState } from "@/redux/cv/cvSlice";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { AppDispatch } from "@/redux/store";
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { cvSchema } from "@/helpers/schema";

export default function Home() {
    const inputRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const cv = useSelector(selectCvState)
    const user = useCurrentUser();

    const { object, submit, isLoading } = useObject({
        api: '/api/generate-cv',
        schema: cvSchema,
    });

    const handleSend = () => {
        if (!input.trim()) return;

        dispatch(generateCv({ description: input }));
        setInput("");
        if (inputRef.current) {
            inputRef.current.innerText = "";
        }
    };


    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full pb-4 pt-2 mt-auto"
            >
                <div className="max-w-3xl mx-auto px-4">
                    <motion.div
                        animate={{ height: "auto" }}
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="relative rounded-2xl lg:rounded-e-3xl p-2.5 flex items-end gap-2 bg-background"
                    >
                        <div
                            contentEditable
                            role="textbox"
                            onInput={(e) => {
                                setInput(e.currentTarget.textContent || "");
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            data-placeholder="Create a script..."
                            className="flex-1 text-gray-200 bg-gray-800 min-h-[36px] max-h-[350px] overflow-y-auto px-3 py-2 focus:outline-none 
                  text-sm rounded-md empty:before:text-gray-300 empty:before:content-[attr(data-placeholder)] whitespace-pre-wrap break-words"
                            ref={inputRef}
                        />
                        <button
                            onClick={handleSend}
                            className="rounded-full shrink-0 mb-0.5 p-1 bg-black text-white"
                        >
                            <ArrowUpIcon strokeWidth={2.5} className="size-5" />
                        </button>
                    </motion.div>
                </div>
            </motion.div>


            {isLoading && <div>Loading...</div>}

            <button
                onClick={() => submit("CoinTrackerly is hiring a\nRemote Crypto Coins & Markets Data Manager\nAs a Remote Crypto Coins & Markets Data Manager, you will be responsible for:\n\nData Management: Adding, updating, and verifying crypto coin and market information on CoinTrackerly.\nQuality Assurance: Ensuring that all entries are accurate, consistent, and adhere to our quality standards.\nTimely Updates: Working efficiently to maintain a comprehensive and current database of coins and markets.\nRemote Collaboration: Communicating with team members and following established procedures while working remotely.\n\nKey Responsibilities:\n\nData Entry & Verification: Input new coin and market data with a focus on accuracy and timeliness.\nResearch & Cross-Verification: Use trusted resources (such as Oklink) to verify key metrics (max supply, total supply, circulating supply, etc.).\nProcess Improvement: Identify discrepancies or potential improvements in data workflows and report them to the team.\nTest Participation: Complete a mandatory test that evaluates your ability to add at least 20 coins and 10 markets within our test environment.\n\nRequired Qualifications:\n\nCrypto Knowledge: Prior experience in cryptocurrency trading, blockchain development, or a similar crypto-related field is highly desirable. (Candidates without direct experience but with strong research skills will also be considered.)\nAttention to Detail: A meticulous approach to data entry and verification.\nRemote Work Experience: Proven ability to work independently in a remote setting with excellent time management.\n\nTest Process:\n\nTo ensure a good match for this role, all candidates must complete a test designed to evaluate:\n\nCrypto Experience & Data Accuracy: How efficiently and accurately you can add coin and market data.\nPerformance Under Time Constraints: Your ability to manage the task within a set timeframe.\nAttention to Detail: Ensuring that all provided information is correct and meets our standards.\n\nHow to Apply:\n\nPlease submit your application to: service@cointrackerly.com\nFollow-Up: Shortlisted candidates will receive further instructions to complete the test as described.\nEvaluation: Your test performance will be a key factor in our final hiring decision.\n\nWe look forward to receiving your application and discovering how you can contribute to the ongoing success of CoinTrackerly!\n\nIf you have any questions or need further clarification, please feel free to reach out.\n\nHappy applying!\n\nPlease mention the word REVERENT when applying to show you read the job post completely (#RMTk3LjE1Ny4xODYuMTA2). This is a feature to avoid fake spam applicants. Companies can search these words to find applicants that read this and instantly see they're human. create a cv with this job description")}
                disabled={isLoading}
            >
                Generate notifications
            </button>

            <div>
                {object?.cvs?.map((cv, index) => (
                    <div key={index}>
                        <p><span className="font-bold">Title</span>{cv!.title}</p>
                        <p><span className="font-bold">Exprience</span>{cv!.experiences}</p>
                        <p><span className="font-bold">Languages</span>{cv!.languages}</p>
                        <p><span className="font-bold">Projects</span>{cv!.projects}</p>
                        <p>{cv!.summary}</p>
                    </div>
                ))}
            </div>



            {/* {cv.cv ? (
                <div>
                    <p>{cv.cv.title}</p>
                    <p>{cv.cv.summary}</p>
                    <p>{cv.cv.skills}</p>
                </div>
            ) : (
                <div>
                    Give your job description and i will generate you a create cv
                </div>
            )} */}
        </div>
    );
}
