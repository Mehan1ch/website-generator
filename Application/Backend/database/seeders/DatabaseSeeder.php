<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            "password" => bcrypt("password"),
        ]);

        // eyJST09UIjp7InR5cGXECHJlc29sdmVkTmFtZSI6IkVkaXRvckNvbnRhaW5lciJ9LCJpc0NhbnZhcyI6dHJ1ZSwicHJvcHPEO2JhY2tncm91bmQiOiIjZWVlIiwicGFkZGluZyI6NX0sImRpc3BsYXnXWywiY3VzdG9tIjp7fSwiaGlkZGVuIjpmYWxzZSwibm9kZXMiOlsieE5CZWRxMV9XWCIsIklIamswQ0t1SUkiLCJSc1dId0lmYTY2IiwiWHZfWk1Wc3oyeSJdLCJsaW5rZWROxkR7fX0szEf/AP1yQ2FyZO4A+OcAlPYA+ewA9TP4APXEU+4A8HBhcmVudCI65gGR+QEA8QDNInRleMQ3MDNxeG1uUTc0WSIsImJ1dHRvbnMiOiI3LUZJRHpKNFJkIuQA9+sBMf8A93JCxUT+APlzaXrEMXNtIiwidmFyaWHlAMJvdXRsaW7kAf5jb2xvcuQCDTAwMCIs6ACrQ2xpY2sgbcUhaGlsZHLkAOjGFsRv9AEx5wCN/wEz/wEz7AIA6wIt/wEJclTkALb9AQfnANhIaSB3b3JsZCEiLCJmb250U+UBHjEy9wDUxVj/ANL/ANLsANLrAvL/ANL/A8/2A885OTnsAtr4ANX4A8//ANrpA99yUXd1a0tmTFlK9gO4yyD/AOb/AbjrAbhJdCdzIG1lIGFnYWlu/wG9/wG95QDj6wGK/wHD7wDd6wPE/wDd5QRCVG9w/AHB+wR8xDr3AL3tBWD4AaZSUzIxVHZnaWLkAedRbEpncnBKNW5D9gGzyy3/ANb/AbPrAbNUaXRs5ARA6gGqMjD/Aar0AO3tBTX/AartANTrAPT/ANT/ANTrANRTdWJ08QDXMfgHOP8A1/8A1/cA1+sGLv8A1+UCR0JvdMR9/wKE9wKExz3/Aof9Aod0Z3l6RV90NFdl9gJ6yyD/AM//Bu78Bu5kZWZhdWzlAYznBu5wcmltYXLkA/39BvFMZWFybiBtb3Jl/wb29wEj6wGt/wHm7QEXfQ==
    }
}
