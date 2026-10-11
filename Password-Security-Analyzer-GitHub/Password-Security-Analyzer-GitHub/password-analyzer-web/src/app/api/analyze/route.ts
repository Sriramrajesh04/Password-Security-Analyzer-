import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Security Checks
    const length_ok = password.length >= 8;
    const upper_ok = /[A-Z]/.test(password);
    const lower_ok = /[a-z]/.test(password);
    const number_ok = /[0-9]/.test(password);
    const special_ok = /[^A-Za-z0-9]/.test(password);

    // Compute SHA-256 Hash
    const hash_value = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // Overall Strength
    const all_ok = length_ok && upper_ok && lower_ok && number_ok && special_ok;
    const strength = all_ok ? 'STRONG' : 'WEAK';

    return NextResponse.json({
      checks: {
        length: length_ok,
        upper: upper_ok,
        lower: lower_ok,
        number: number_ok,
        special: special_ok,
      },
      hash: hash_value,
      strength,
      all_ok,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
