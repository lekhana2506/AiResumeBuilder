import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button';

function Header() {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-md font-extrabold '>
            <h1>CareerCrafter</h1>
            {
                isSignedIn ? <div className='flex gap-2 items-center'><Link to={'/dashboard'}><Button>Dashboard</Button></Link><UserButton /></div> : <Link to={'/auth/signin'}>
                    <button varient='outline' className='text-white bg-primary'>Get Started</button>
                </Link>
            }

        </div>
    )
}

export default Header