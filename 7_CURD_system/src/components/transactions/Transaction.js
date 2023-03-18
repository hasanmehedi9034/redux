import React from 'react'

export default function Transaction() {
    return (
        <li class="transaction income">
            <p>Earned this month</p>
            <div class="right">
                <p>৳ 100</p>
                <button class="link">
                    <img
                        class="icon"
                        src="./images/edit.svg"
                    />
                </button>
                <button class="link">
                    <img
                        class="icon"
                        src="./images/delete.svg"
                    />
                </button>
            </div>
        </li>
    )
}
