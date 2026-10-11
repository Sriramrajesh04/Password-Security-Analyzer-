import tkinter as tk
from tkinter import messagebox
import hashlib
import re


# =========================
# COLORS
# =========================

BG = "#0b0f14"
CARD = "#111820"
TEXT = "#e6edf3"
GREEN = "#00ff88"
RED = "#ff4d4d"
YELLOW = "#ffd43b"
BUTTON = "#18232e"


# =========================
# ANALYZE PASSWORD
# =========================

def analyze_password():

    password = password_entry.get()

    if not password:
        messagebox.showwarning(
            "Warning",
            "Please enter a password."
        )
        return

    # Security checks

    length_ok = len(password) >= 8
    upper_ok = bool(re.search(r"[A-Z]", password))
    lower_ok = bool(re.search(r"[a-z]", password))
    number_ok = bool(re.search(r"[0-9]", password))
    special_ok = bool(re.search(r"[^A-Za-z0-9]", password))

    # Mandatory requirements

    if not length_ok:
        messagebox.showwarning(
            "Invalid Password",
            "Password must contain at least 8 characters."
        )
        return

    if not upper_ok:
        messagebox.showwarning(
            "Invalid Password",
            "Password must contain at least one uppercase letter."
        )
        return

    if not lower_ok:
        messagebox.showwarning(
            "Invalid Password",
            "Password must contain at least one lowercase letter."
        )
        return

    if not number_ok:
        messagebox.showwarning(
            "Invalid Password",
            "Password must contain at least one number."
        )
        return

    if not special_ok:
        messagebox.showwarning(
            "Invalid Password",
            "Password must contain at least one special character."
        )
        return

    # =========================
    # PASSWORD STRENGTH
    # =========================

    strength = "STRONG"

    strength_label.config(
        text="● STRONG",
        fg=GREEN
    )

    strength_bar.config(
        width=350,
        bg=GREEN
    )

    # =========================
    # SECURITY CHECKS
    # =========================

    checks_label.config(
        text=
        "✓ Minimum 8 characters\n"
        "✓ Uppercase letter\n"
        "✓ Lowercase letter\n"
        "✓ Number\n"
        "✓ Special character",
        fg=GREEN
    )

    # =========================
    # SHA-256 HASH
    # =========================

    hash_value = hashlib.sha256(
        password.encode()
    ).hexdigest()

    hash_text.delete(
        "1.0",
        tk.END
    )

    hash_text.insert(
        tk.END,
        hash_value
    )

    recommendation_label.config(
        text="✓ Password meets all security requirements.",
        fg=GREEN
    )


# =========================
# SHOW / HIDE
# =========================

def toggle_password():

    if password_entry.cget("show") == "*":

        password_entry.config(show="")
        show_button.config(text="HIDE")

    else:

        password_entry.config(show="*")
        show_button.config(text="SHOW")


# =========================
# CLEAR
# =========================

def clear_all():

    password_entry.delete(
        0,
        tk.END
    )

    strength_label.config(
        text="● WAITING",
        fg=YELLOW
    )

    strength_bar.config(
        width=0
    )

    checks_label.config(
        text="Security checks will appear here.",
        fg=TEXT
    )

    hash_text.delete(
        "1.0",
        tk.END
    )

    recommendation_label.config(
        text=""
    )


# =========================
# MAIN WINDOW
# =========================

window = tk.Tk()

window.title(
    "Password Security Analyzer"
)

window.geometry(
    "700x720"
)

window.configure(
    bg=BG
)

window.resizable(
    False,
    False
)


# =========================
# HEADER
# =========================

title = tk.Label(
    window,
    text="🔐 PASSWORD SECURITY ANALYZER",
    font=("Arial", 22, "bold"),
    bg=BG,
    fg=GREEN
)

title.pack(
    pady=(30, 5)
)


developer = tk.Label(
    window,
    text="Cybersecurity Project • Developed by Sriram",
    font=("Arial", 10),
    bg=BG,
    fg="#8b949e"
)

developer.pack(
    pady=(0, 25)
)


# =========================
# MAIN CARD
# =========================

card = tk.Frame(
    window,
    bg=CARD,
    padx=30,
    pady=25
)

card.pack(
    padx=40,
    fill="both"
)


# =========================
# PASSWORD LABEL
# =========================

password_label = tk.Label(
    card,
    text="ENTER PASSWORD",
    font=("Arial", 11, "bold"),
    bg=CARD,
    fg=TEXT
)

password_label.pack(
    anchor="w"
)


# =========================
# PASSWORD ENTRY
# =========================

password_entry = tk.Entry(
    card,
    width=43,
    font=("Arial", 14),
    show="*",
    bg="#080c10",
    fg=TEXT,
    insertbackground=GREEN,
    relief="flat"
)

password_entry.pack(
    pady=12,
    ipady=10
)


# =========================
# SHOW BUTTON
# =========================

show_button = tk.Button(
    card,
    text="SHOW",
    width=10,
    font=("Arial", 9, "bold"),
    bg=BUTTON,
    fg=TEXT,
    activebackground=GREEN,
    activeforeground=BG,
    relief="flat",
    command=toggle_password
)

show_button.pack()


# =========================
# ANALYZE BUTTON
# =========================

analyze_button = tk.Button(
    card,
    text="🔍  ANALYZE PASSWORD",
    width=30,
    font=("Arial", 12, "bold"),
    bg=GREEN,
    fg=BG,
    activebackground="#00cc6a",
    activeforeground=BG,
    relief="flat",
    command=analyze_password
)

analyze_button.pack(
    pady=25,
    ipady=8
)


# =========================
# STRENGTH
# =========================

strength_label = tk.Label(
    card,
    text="● WAITING",
    font=("Arial", 16, "bold"),
    bg=CARD,
    fg=YELLOW
)

strength_label.pack()


# =========================
# STRENGTH BAR
# =========================

bar_background = tk.Frame(
    card,
    width=350,
    height=10,
    bg="#252f38"
)

bar_background.pack(
    pady=12
)

bar_background.pack_propagate(False)


strength_bar = tk.Frame(
    bar_background,
    width=0,
    height=10,
    bg=GREEN
)

strength_bar.pack(
    side="left"
)


# =========================
# SECURITY CHECKS
# =========================

checks_title = tk.Label(
    card,
    text="SECURITY REQUIREMENTS",
    font=("Arial", 10, "bold"),
    bg=CARD,
    fg="#8b949e"
)

checks_title.pack(
    pady=(15, 5)
)


checks_label = tk.Label(
    card,
    text="Security checks will appear here.",
    font=("Arial", 10),
    justify="left",
    bg=CARD,
    fg=TEXT
)

checks_label.pack()


# =========================
# RECOMMENDATION
# =========================

recommendation_label = tk.Label(
    card,
    text="",
    font=("Arial", 10, "bold"),
    bg=CARD
)

recommendation_label.pack(
    pady=12
)


# =========================
# HASH SECTION
# =========================

hash_title = tk.Label(
    card,
    text="SHA-256 CRYPTOGRAPHIC HASH",
    font=("Arial", 10, "bold"),
    bg=CARD,
    fg="#8b949e"
)

hash_title.pack(
    pady=(10, 5)
)


hash_text = tk.Text(
    card,
    height=3,
    width=65,
    font=("Consolas", 9),
    bg="#080c10",
    fg=GREEN,
    insertbackground=GREEN,
    relief="flat",
    wrap="word"
)

hash_text.pack(
    pady=5
)


# =========================
# CLEAR BUTTON
# =========================

clear_button = tk.Button(
    card,
    text="CLEAR",
    width=12,
    font=("Arial", 9, "bold"),
    bg=BUTTON,
    fg=TEXT,
    activebackground=RED,
    activeforeground=TEXT,
    relief="flat",
    command=clear_all
)

clear_button.pack(
    pady=15
)


# =========================
# FOOTER
# =========================

footer = tk.Label(
    window,
    text="Password Security Analyzer | SHA-256 | Cybersecurity",
    font=("Arial", 9),
    bg=BG,
    fg="#58636e"
)

footer.pack(
    pady=15
)


# =========================
# START
# =========================

window.mainloop()

