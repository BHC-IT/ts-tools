/*
MIT License

Copyright (c) 2020 BHC-IT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

#include <napi.h>
#include <string>
#include "./base.h"

Napi::String base_bind(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();

	std::string str = (std::string) info[0].ToString();
	std::string result = base(str);

	return Napi::String::New(env, result);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
	exports.Set(
		Napi::String::New(env, "base"),
		Napi::Function::New(env, base_bind)
		);

	return exports;
}

NODE_API_MODULE(base, Init)
