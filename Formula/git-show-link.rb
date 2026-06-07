class GitShowLink < Formula
  desc "Get clickable HTTPS commit links from SSH remotes"
  homepage "https://github.com/TAHPAPANGKORN/git-show-link"
  url "https://registry.npmjs.org/git-show-link/-/git-show-link-1.2.1.tgz"
  sha256 "d5dafaf8f591ee85b618abc21b30791e72055f7b04d0e6a89bf33721a623b63e"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    assert_match "git show-link version:", shell_output("#{bin}/git-show-link --version")
  end
end
